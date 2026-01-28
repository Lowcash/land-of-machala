export const BASE_CRIT_CHANCE = 5
export const BASE_DODGE_CHANCE = 5

const XP_BASE = 100
const XP_MULTIPLIER = 1.5

export function calculateXpForLevel(level: number): number {
  return Math.floor(XP_BASE * Math.pow(XP_MULTIPLIER, level - 1))
}

export function calculateProgression(
  currentLevel: number,
  currentXp: number,
  xpToAdd: number
): {
  newLevel: number
  newXp: number
  newTalentPoints: number
  levelsGained: number
} {
  let newXp = currentXp + xpToAdd
  let newLevel = currentLevel
  let levelsGained = 0

  while (newXp >= calculateXpForLevel(newLevel)) {
    newXp -= calculateXpForLevel(newLevel)
    newLevel++
    levelsGained++
  }

  return {
    newLevel,
    newXp,
    newTalentPoints: levelsGained, // 1 point per level
    levelsGained,
  }
}

export function calculateMaxHp(stamina: number, level: number): number {
  return 100 + stamina * 5 + level * 10
}

export function calculateMaxMana(intelligence: number, level: number): number {
  return 50 + intelligence * 3 + level * 5
}

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

export function calculateCombatDamage(attack: number, defense: number, variance = 0.1): number {
  const baseDamage = Math.max(1, attack - defense)
  const randomFactor = 1 + (Math.random() * variance * 2 - variance)
  return Math.floor(baseDamage * randomFactor)
}

export function isCriticalHit(agility: number): boolean {
  const critChance = Math.min(0.3, agility * 0.005) // Max 30% crit chance
  return Math.random() < critChance
}

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

export function calculateGoldReward(baseGold: number, variance = 0.2): number {
  const randomFactor = 1 + (Math.random() * variance * 2 - variance)
  return Math.floor(baseGold * randomFactor)
}

export function calculateCritChance(agility: number): number {
  return Math.min(BASE_CRIT_CHANCE + Math.floor(agility / 2), 50)
}

export function calculateDodgeChance(agility: number): number {
  return Math.min(BASE_DODGE_CHANCE + Math.floor(agility / 3), 40)
}
