import { prisma } from '@/lib/db'

/**
 * Combat Entity Layer
 * Handles enemy data and combat mechanics
 */

export async function getAllEnemies() {
  return await prisma.enemy.findMany({
    orderBy: [{ level: 'asc' }],
  })
}

export async function getEnemy(id: string) {
  return await prisma.enemy.findUnique({
    where: { id },
  })
}

export async function getEnemiesByLevel(minLevel: number, maxLevel: number) {
  return await prisma.enemy.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
    orderBy: [{ level: 'asc' }],
  })
}

export async function getRandomEnemy(characterLevel: number) {
  const levelRange = 2
  const minLevel = Math.max(1, characterLevel - levelRange)
  const maxLevel = characterLevel + levelRange

  const enemies = await prisma.enemy.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
  })

  if (enemies.length === 0) {
    throw new Error('No enemies found for level range')
  }

  return enemies[Math.floor(Math.random() * enemies.length)]
}

/**
 * Calculate total attack damage including equipment bonuses
 */
export function calculateAttackDamage(
  baseAttack: number,
  characterStats: {
    strength: number
    intelligence: number
    agility: number
  },
  equipment: Array<{
    item: {
      strength: number
      intelligence: number
      agility: number
    }
  }>
): number {
  const equipmentBonus = equipment.reduce((total, equipped) => {
    return total + equipped.item.strength + equipped.item.intelligence + equipped.item.agility
  }, 0)

  const statBonus =
    characterStats.strength +
    Math.floor(characterStats.intelligence / 2) +
    Math.floor(characterStats.agility / 3)

  return baseAttack + statBonus + equipmentBonus
}

/**
 * Calculate total defense including equipment bonuses
 */
export function calculateDefense(
  characterStats: {
    stamina: number
    agility: number
  },
  equipment: Array<{
    item: {
      stamina: number
      agility: number
    }
  }>
): number {
  const equipmentBonus = equipment.reduce((total, equipped) => {
    return total + equipped.item.stamina + equipped.item.agility
  }, 0)

  const statBonus = Math.floor(characterStats.stamina / 2) + Math.floor(characterStats.agility / 4)

  return statBonus + equipmentBonus
}

/**
 * Calculate damage dealt in combat
 */
export function calculateCombatDamage(attack: number, defense: number, variance = 0.1): number {
  const baseDamage = Math.max(1, attack - defense)
  const randomFactor = 1 + (Math.random() * variance * 2 - variance)
  return Math.floor(baseDamage * randomFactor)
}

/**
 * Determine if an attack is a critical hit
 */
export function isCriticalHit(agility: number): boolean {
  const critChance = Math.min(0.3, agility * 0.005) // Max 30% crit chance
  return Math.random() < critChance
}

/**
 * Calculate experience reward based on enemy level and character level
 */
export function calculateExperienceReward(
  baseExperience: number,
  enemyLevel: number,
  characterLevel: number
): number {
  const levelDifference = enemyLevel - characterLevel
  let multiplier = 1

  if (levelDifference > 0) {
    // Higher level enemy = more XP
    multiplier = 1 + levelDifference * 0.1
  } else if (levelDifference < -3) {
    // Much lower level enemy = less XP
    multiplier = Math.max(0.1, 1 + levelDifference * 0.15)
  }

  return Math.floor(baseExperience * multiplier)
}

/**
 * Calculate gold reward with variance
 */
export function calculateGoldReward(baseGold: number, variance = 0.2): number {
  const randomFactor = 1 + (Math.random() * variance * 2 - variance)
  return Math.floor(baseGold * randomFactor)
}
