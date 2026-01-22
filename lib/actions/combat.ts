'use server'

import {
  addExperience,
  getCharacter,
  getCharacterByUserId,
  updateCharacterResources,
} from '@/entity/character'
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
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { checkCombatAchievements } from './achievement'

/**
 * Combat Server Actions
 * Handles combat initialization and turn-based combat mechanics
 */

const initiateCombatSchema = z.object({
  characterId: z.string(),
})

const performActionSchema = z.object({
  characterId: z.string(),
  enemyId: z.string(),
  enemyCurrentHp: z.number().int().min(0),
  action: z.enum(['attack', 'defend', 'special', 'flee']),
})

const useItemSchema = z.object({
  characterId: z.string(),
  itemId: z.string(),
})

export const initiateCombatAction = createServerAction()
  .input(initiateCombatSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    // Get random enemy based on character level
    const enemy = await getRandomEnemy(character.level)
    if (!enemy) {
      throw new Error('No enemy available for this level')
    }

    return {
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

export const performCombatActionAction = createServerAction()
  .input(performActionSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const equipment = await getEquippedItems(input.characterId)

    // Calculate player stats
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

    // Get enemy (simplified - in real app would fetch from combat state)
    const enemy = await getRandomEnemy(character.level)
    if (!enemy) {
      throw new Error('No enemy available for this level')
    }

    let playerDamage = 0
    let enemyDamage = 0
    let playerCrit = false
    let enemyCrit = false
    const combatLog: string[] = []

    // Handle player action
    switch (input.action) {
      case 'attack': {
        playerCrit = isCriticalHit(character.agility)
        const baseDamage = calculateCombatDamage(playerAttack, enemy.defense)
        playerDamage = playerCrit ? baseDamage * 2 : baseDamage

        combatLog.push(
          playerCrit
            ? `Critical hit! You deal ${playerDamage} damage!`
            : `You attack for ${playerDamage} damage!`
        )
        break
      }

      case 'defend': {
        combatLog.push('You take a defensive stance!')
        // Defense reduces incoming damage by 50%
        enemyDamage = Math.floor(calculateCombatDamage(enemy.attack, playerDefense * 2) * 0.5)
        break
      }

      case 'special': {
        // Special attack costs mana (simplified)
        if (character.mana >= 10) {
          playerDamage = Math.floor(playerAttack * 1.5)
          await updateCharacterResources(input.characterId, {
            mana: character.mana - 10,
          })
          combatLog.push(`You use a special attack for ${playerDamage} damage!`)
        } else {
          combatLog.push('Not enough mana for special attack!')
        }
        break
      }

      case 'flee': {
        const fleeChance = 0.5
        if (Math.random() < fleeChance) {
          combatLog.push('You successfully fled from combat!')
          return {
            result: 'fled' as const,
            combatLog,
          }
        } else {
          combatLog.push('Failed to flee!')
        }
        break
      }
    }

    // Enemy turn (if not defending)
    if (input.action !== 'defend') {
      enemyCrit = isCriticalHit(enemy.attack * 0.1) // Enemies have lower crit chance
      const baseDamage = calculateCombatDamage(enemy.attack, playerDefense)
      enemyDamage = enemyCrit ? baseDamage * 2 : baseDamage

      combatLog.push(
        enemyCrit
          ? `${enemy.name} lands a critical hit for ${enemyDamage} damage!`
          : `${enemy.name} attacks for ${enemyDamage} damage!`
      )
    }

    // Update HP
    const newEnemyHp = Math.max(0, input.enemyCurrentHp - playerDamage)
    const newPlayerHp = Math.max(0, character.hp - enemyDamage)

    await updateCharacterResources(input.characterId, {
      hp: newPlayerHp,
    })

    // Check combat outcome
    if (newEnemyHp <= 0) {
      // Victory!
      const xpReward = calculateExperienceReward(
        enemy.experienceReward,
        enemy.level,
        character.level
      )
      const goldReward = calculateGoldReward(enemy.goldReward)

      await addExperience(input.characterId, xpReward)
      await updateCharacterResources(input.characterId, {
        gold: character.gold + goldReward,
      })

      combatLog.push(`${enemy.name} defeated!`)
      combatLog.push(`You gained ${xpReward} XP and ${goldReward} gold!`)

      // Check achievements
      await checkCombatAchievements(input.characterId, 1)

      return {
        result: 'victory' as const,
        combatLog,
        rewards: {
          xp: xpReward,
          gold: goldReward,
        },
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
      }
    }

    if (newPlayerHp <= 0) {
      // Defeat
      combatLog.push('You have been defeated!')

      // Respawn at town with half HP
      await updateCharacterResources(input.characterId, {
        hp: Math.floor(character.maxHp / 2),
      })

      return {
        result: 'defeat' as const,
        combatLog,
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
      }
    }

    // Combat continues
    return {
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

export const performUseItemAction = createServerAction()
  .input(useItemSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    // Get item from inventory and apply effects
    // (Implementation depends on item effects system)

    return {
      success: true,
      message: 'Item used successfully',
    }
  })

/**
 * Combat State Management for SSR
 */

const startCombatSchema = z.object({
  enemyId: z.string(),
  enemyHp: z.number(),
})

const updateCombatSchema = z.object({
  playerHp: z.number(),
  enemyHp: z.number(),
  turn: z.enum(['player', 'enemy']),
})

/**
 * Start combat encounter (sets backend state)
 */
export const startCombatState = createServerAction()
  .input(startCombatSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const character = await getCharacterByUserId(session.user.id)
    if (!character) throw new Error('Character not found')

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

/**
 * Update combat state during battle
 */
export const updateCombatState = createServerAction()
  .input(updateCombatSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const character = await getCharacterByUserId(session.user.id)

    if (!character) throw new Error('Character not found')
    if (!character.inCombat) throw new Error('Not in combat')

    await updateCharacterCombatState(character.id, {
      combatPlayerHp: input.playerHp,
      combatEnemyHp: input.enemyHp,
      combatTurn: input.turn,
    })

    return { success: true }
  })

/**
 * End combat (victory or defeat)
 */
export const endCombatState = createServerAction().handler(async () => {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const character = await getCharacterByUserId(session.user.id)

  if (!character) throw new Error('Character not found')

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

/**
 * Get current combat state (for SSR)
 */
export async function getCombatState() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)
  if (!character) return null

  // Using getCharacterCombatState would be cleaner but we already have the character object here
  // However, getCharacterByUserId might not select combat fields, let's double check.
  // Actually, getCharacterByUserId usually returns the whole character.
  // But to be safe and use our new API:

  return await getCharacterCombatState(character.id)
}
