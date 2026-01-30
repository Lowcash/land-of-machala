'use server'

import { addExperience, getCharacterByUserId, updateCharacterResources } from '@/entity/character'
import {
  getCharacterCombatState,
  getRandomEnemy,
  updateCharacterCombatState,
} from '@/entity/combat'
import { getEquippedItems } from '@/entity/inventory'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import {
  applyBuffsToStats,
  calculateAttackDamage,
  calculateCombatDamage,
  calculateDefense,
  calculateDodgeChance,
  calculateExperienceReward,
  calculateGoldReward,
  isCriticalHit,
} from '@/lib/game/formulas'
import {
  performActionSchema,
  startCombatSchema,
  updateCombatSchema,
  useItemSchema,
} from '@/lib/schemas/combat'

import { checkCombatAchievements, checkLevelAchievements } from './achievement'
import { characterProcedure } from './procedures'

/**
 * Combat Server Actions
 * Handles combat initialization, turn-based mechanics, and state management.
 */

/**
 * Initiates a new combat encounter with a random enemy.
 */
export const initiateCombatAction = characterProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { character } = ctx

    const enemy = await getRandomEnemy(character.level)
    if (!enemy) {
      return { success: false, message: 'Žádný nepřítel není blízko tvého okolí.' }
    }

    await updateCharacterCombatState(character.id, {
      inCombat: true,
      combatEnemyId: enemy.id,
      combatTurn: 'player',
      combatPlayerHp: character.hp,
      combatEnemyHp: enemy.maxHp,
      currentView: 'combat',
    })

    return {
      success: true,
      enemy,
      combat: {
        playerHp: character.hp,
        playerMaxHp: character.maxHp,
        enemyHp: enemy.maxHp,
        enemyMaxHp: enemy.maxHp,
        turn: 'player' as const,
        round: 1,
      },
    }
  })

/**
 * Performs a combat turn (attack, defend, etc.).
 */
export const performCombatActionAction = characterProcedure
  .createServerAction()
  .input(performActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const equipment = await getEquippedItems(character.id)

    const baseStats = {
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
    }

    // Apply active buffs (e.g., from Healer)
    const buffedStats = applyBuffsToStats(
      baseStats,
      (character as unknown as { buffs?: Array<{ type: string; value: number }> }).buffs
    )

    // Calculate player attributes
    const playerAttack = calculateAttackDamage(
      10, // base attack
      buffedStats,
      equipment
    )

    const playerDefense = calculateDefense(
      {
        stamina: buffedStats.stamina,
        agility: buffedStats.agility,
      },
      equipment
    )

    // In a real stateful app, we'd fetch the specific enemy instance,
    // but for this implementation we use the level-based random enemy.
    const enemy = await getRandomEnemy(character.level)
    if (!enemy) {
      return { success: false, message: 'Nepřítel zmizel v mlze.' }
    }

    let playerDamage = 0
    let enemyDamage = 0
    let playerCrit = false
    let enemyCrit = false
    const combatLog: string[] = []

    const actionResult = {
      playerDodged: false,
      enemyDodged: false,
      playerCrit: false,
      enemyCrit: false,
    }

    // 4. Combat Logic
    const playerDodgeChance = calculateDodgeChance(baseStats.agility)
    // Enemy dodge chance - mock or derive. For now 5% + level scaling?
    const enemyDodgeChance = Math.min(30, enemy.level * 2)

    // 1. Process Player Choice
    switch (input.action) {
      case 'attack': {
        const enemyDodged = Math.random() * 100 < enemyDodgeChance

        if (enemyDodged) {
          combatLog.push(`${enemy.name} se tvému útoku vyhnul!`)
          playerDamage = 0
          actionResult.enemyDodged = true
        } else {
          playerCrit = isCriticalHit(character.agility)
          const baseDamage = calculateCombatDamage(playerAttack, enemy.defense)
          playerDamage = playerCrit ? baseDamage * 2 : baseDamage
          actionResult.playerCrit = playerCrit

          combatLog.push(
            playerCrit
              ? `Kritický zásah! Udělil jsi ${playerDamage} poškození!`
              : `Zaútočil jsi za ${playerDamage} poškození!`
          )
        }
        break
      }

      case 'defend': {
        combatLog.push('Zaujal jsi obranný postoj!')
        // Defense reduces incoming damage significantly
        break
      }

      case 'special': {
        if (character.mana >= 10) {
          const enemyDodged = Math.random() * 100 < enemyDodgeChance

          if (enemyDodged) {
            combatLog.push(`${enemy.name} se tvému speciálnímu útoku vyhnul!`)
            await updateCharacterResources(character.id, { mana: character.mana - 10 })
            playerDamage = 0
            actionResult.enemyDodged = true
          } else {
            playerDamage = Math.floor(playerAttack * 1.5)
            await updateCharacterResources(character.id, {
              mana: character.mana - 10,
            })
            combatLog.push(`Použil jsi speciální útok za ${playerDamage} poškození!`)
          }
        } else {
          combatLog.push('Nedostatek many pro speciální útok!')
        }
        break
      }

      case 'flee': {
        const fleeChance = 0.5
        if (Math.random() < fleeChance) {
          combatLog.push('Úspěšně jsi utekl z boje!')
          return {
            success: true,
            result: 'fled' as const,
            combatLog,
          }
        } else {
          combatLog.push('Útěk se nezdařil! Nepřítel ti zablokoval cestu.')
        }
        break
      }
    }

    // 2. Process Enemy Counter (Skipped if player defended since it's handled in switch)
    if (input.action !== 'defend') {
      const playerDodged = Math.random() * 100 < playerDodgeChance

      if (playerDodged) {
        combatLog.push(`Vyhnul ses útoku ${enemy.name}!`)
        enemyDamage = 0
        actionResult.playerDodged = true
      } else {
        enemyCrit = isCriticalHit(enemy.attack * 0.1)
        const baseDamage = calculateCombatDamage(enemy.attack, playerDefense)
        enemyDamage = enemyCrit ? baseDamage * 2 : baseDamage
        actionResult.enemyCrit = enemyCrit

        combatLog.push(
          enemyCrit
            ? `${enemy.name} udělil kritický zásah za ${enemyDamage} poškození!`
            : `${enemy.name} útočí za ${enemyDamage} poškození!`
        )
      }
    } else {
      // Defend Logic: Enemy attacks but damage is reduced (and no dodge while defending potentially? or Keep dodge?)
      // Let's say Defend = Guaranteed Block (no dodge needed) but reduced damage
      enemyCrit = isCriticalHit(enemy.attack * 0.1)
      const baseDamage = calculateCombatDamage(enemy.attack, playerDefense * 2) // Double def
      enemyDamage = Math.floor((enemyCrit ? baseDamage * 2 : baseDamage) * 0.5) // Halved dmg

      combatLog.push(`${enemy.name} útočí do tvé obrany za ${enemyDamage} poškození.`)
    }

    // 3. Update Health States
    const newEnemyHp = Math.max(0, input.enemyCurrentHp - playerDamage)
    const newPlayerHp = Math.max(0, character.hp - enemyDamage)

    await updateCharacterResources(character.id, {
      hp: newPlayerHp,
    })

    // 4. Determine Combat Result
    if (newEnemyHp <= 0) {
      const xpReward = calculateExperienceReward(
        enemy.experienceReward,
        enemy.level,
        character.level
      )
      const goldReward = calculateGoldReward(enemy.goldReward)

      const updatedCharacter = await addExperience(character.id, xpReward)
      await updateCharacterResources(character.id, {
        gold: character.gold + goldReward,
      })

      combatLog.push(`${enemy.name} byl poražen!`)
      combatLog.push(`Získal jsi ${xpReward} XP a ${goldReward} zlata!`)

      const combatAchievements = await checkCombatAchievements(character.id, 1)
      const levelAchievements = await checkLevelAchievements(character.id, updatedCharacter.level)
      const levelUp = updatedCharacter.level > character.level

      return {
        success: true,
        result: 'victory' as const,
        combatLog,
        rewards: { xp: xpReward, gold: goldReward },
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
        achievements: [...combatAchievements, ...levelAchievements],
        levelUp,
        newLevel: updatedCharacter.level,
        playerCrit: actionResult.playerCrit,
        enemyCrit: actionResult.enemyCrit,
        playerDodged: actionResult.playerDodged,
        enemyDodged: actionResult.enemyDodged,
      }
    }

    if (newPlayerHp <= 0) {
      combatLog.push('Byl jsi poražen a upadl jsi do bezvědomí...')

      // Defeat consequences: Respawn at half health
      await updateCharacterResources(character.id, {
        hp: Math.floor(character.maxHp / 2),
      })

      return {
        success: true,
        result: 'defeat' as const,
        combatLog,
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
      }
    }

    // 5. Combat continues
    return {
      success: true,
      result: 'ongoing' as const,
      combatLog,
      playerHp: newPlayerHp,
      enemyHp: newEnemyHp,
      playerDamage,
      enemyDamage,
      playerCrit: actionResult.playerCrit,
      enemyCrit: actionResult.enemyCrit,
      playerDodged: actionResult.playerDodged,
      enemyDodged: actionResult.enemyDodged,
    }
  })

export const performUseItemAction = characterProcedure
  .createServerAction()
  .input(useItemSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { itemId } = input

    // 1. Fetch inventory item
    const inventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: character.id,
        id: itemId,
      },
      include: {
        item: true,
      },
    })

    if (!inventoryItem) {
      throw new Error('Předmět nebyl nalezen v inventáři.')
    }

    const { item } = inventoryItem

    if (item.type !== 'CONSUMABLE') {
      throw new Error('Tento předmět nelze použít v boji.')
    }

    // 2. Apply effects
    let message = 'Předmět byl úspěšně použit.'

    if (item.healing > 0) {
      const newHp = Math.min(character.maxHp, character.hp + item.healing)
      await updateCharacterResources(character.id, { hp: newHp })
      message = `Použil jsi ${item.name} a vyléčil se o ${item.healing} HP.`
    }

    if (item.manaRestore > 0) {
      const newMana = Math.min(character.maxMana, character.mana + item.manaRestore)
      await updateCharacterResources(character.id, { mana: newMana })
      message = `Použil jsi ${item.name} a obnovil ${item.manaRestore} Many.`
    }

    // 3. Consume item
    const { consumeInventoryItem } = await import('@/entity/inventory')
    const { logActivity } = await import('./activity-log')

    await consumeInventoryItem(character.id, inventoryItem.id, 1)
    await logActivity(character.id, 'info', message)

    return {
      success: true,
      message,
    }
  })

/**
 * State Management
 */

export const startCombatState = characterProcedure
  .createServerAction()
  .input(startCombatSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    await updateCharacterCombatState(character.id, {
      inCombat: true,
      combatEnemyId: input.enemyId,
      combatTurn: 'player',
      combatPlayerHp: character.hp,
      combatEnemyHp: input.enemyHp,
      currentView: 'combat',
    })

    return { success: true }
  })

export const updateCombatState = characterProcedure
  .createServerAction()
  .input(updateCombatSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    if (!character.inCombat) return { success: false, message: 'Nejsi v boji.' }

    await updateCharacterCombatState(character.id, {
      combatPlayerHp: input.playerHp,
      combatEnemyHp: input.enemyHp,
      combatTurn: input.turn,
    })

    return { success: true }
  })

export const endCombatState = characterProcedure.createServerAction().handler(async ({ ctx }) => {
  const { character } = ctx

  await updateCharacterCombatState(character.id, {
    inCombat: false,
    combatEnemyId: null,
    combatTurn: null,
    combatPlayerHp: null,
    combatEnemyHp: null,
    currentView: 'town',
  })

  return { success: true }
})

export async function getCombatState() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)
  if (!character) return null

  return await getCharacterCombatState(character.id)
}
