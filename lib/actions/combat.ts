'use server'

import { addExperience, getCharacterByUserId, updateCharacterResources } from '@/entity/character'
import {
  calculateAttackDamage,
  calculateCombatDamage,
  calculateDefense,
  calculateExperienceReward,
  calculateGoldReward,
  getCharacterCombatState,
  getRandomEnemy,
  isCriticalHit,
  updateCharacterCombatState,
} from '@/entity/combat'
import { getEquippedItems } from '@/entity/inventory'

import { auth } from '@/lib/auth'
import {
  performActionSchema,
  startCombatSchema,
  updateCombatSchema,
  useItemSchema,
} from '@/lib/schemas/combat'

import { checkCombatAchievements } from './achievement'
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

    // Calculate player attributes
    const playerAttack = calculateAttackDamage(
      10, // base attack
      {
        strength: character.strength,
        intelligence: character.intelligence,
        agility: character.agility,
      },
      equipment
    )

    const playerDefense = calculateDefense(
      {
        stamina: character.stamina,
        agility: character.agility,
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

    // 1. Process Player Choice
    switch (input.action) {
      case 'attack': {
        playerCrit = isCriticalHit(character.agility)
        const baseDamage = calculateCombatDamage(playerAttack, enemy.defense)
        playerDamage = playerCrit ? baseDamage * 2 : baseDamage

        combatLog.push(
          playerCrit
            ? `Kritický zásah! Udělil jsi ${playerDamage} poškození!`
            : `Zaútočil jsi za ${playerDamage} poškození!`
        )
        break
      }

      case 'defend': {
        combatLog.push('Zaujal jsi obranný postoj!')
        // Defense reduces incoming damage significantly
        enemyDamage = Math.floor(calculateCombatDamage(enemy.attack, playerDefense * 2) * 0.5)
        break
      }

      case 'special': {
        if (character.mana >= 10) {
          playerDamage = Math.floor(playerAttack * 1.5)
          await updateCharacterResources(character.id, {
            mana: character.mana - 10,
          })
          combatLog.push(`Použil jsi speciální útok za ${playerDamage} poškození!`)
        } else {
          combatLog.push('Nedostatek many pro speciální útok!')
          // Player essentially loses turn if they try and fail?
          // Or we could return error. Let's return a soft error in log.
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
      enemyCrit = isCriticalHit(enemy.attack * 0.1)
      const baseDamage = calculateCombatDamage(enemy.attack, playerDefense)
      enemyDamage = enemyCrit ? baseDamage * 2 : baseDamage

      combatLog.push(
        enemyCrit
          ? `${enemy.name} udělil kritický zásah za ${enemyDamage} poškození!`
          : `${enemy.name} útočí za ${enemyDamage} poškození!`
      )
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

      await addExperience(character.id, xpReward)
      await updateCharacterResources(character.id, {
        gold: character.gold + goldReward,
      })

      combatLog.push(`${enemy.name} byl poražen!`)
      combatLog.push(`Získal jsi ${xpReward} XP a ${goldReward} zlata!`)

      await checkCombatAchievements(character.id, 1)

      return {
        success: true,
        result: 'victory' as const,
        combatLog,
        rewards: { xp: xpReward, gold: goldReward },
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
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
      playerCrit,
      enemyCrit,
    }
  })

export const performUseItemAction = characterProcedure
  .createServerAction()
  .input(useItemSchema)
  .handler(async () => {
    return {
      success: true,
      message: 'Předmět byl úspěšně použit.',
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
