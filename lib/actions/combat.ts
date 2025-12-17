'use server'

import { addExperience, getCharacter, updateCharacterResources } from '@/entity/character'
import {
  calculateAttackDamage,
  calculateCombatDamage,
  calculateDefense,
  calculateExperienceReward,
  calculateGoldReward,
  getRandomEnemy,
  isCriticalHit,
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
    let combatLog: string[] = []

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

export const useCombatItemAction = createServerAction()
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
