/**
 * Progression Logic
 * Centralized formulas for experience and leveling
 */

const BASE_XP = 100
const XP_MULTIPLIER = 1.5

/**
 * Calculate total experience needed to reach a specific level
 */
export function getTotalXPForLevel(level: number): number {
  if (level <= 1) return 0
  // Level 2 requires level 1's threshold, etc.
  // We use the formula: threshold = BASE_XP * (level - 1)^XP_MULTIPLIER
  return Math.floor(BASE_XP * Math.pow(level - 1, XP_MULTIPLIER))
}

/**
 * Calculate level from total experience
 */
export function getLevelFromXP(totalXP: number): number {
  let level = 1
  while (totalXP >= getTotalXPForLevel(level + 1)) {
    level++
  }
  return level
}

/**
 * Calculate XP required specifically to get from current level to next level
 */
export function getXPNeededForNextLevel(currentLevel: number): number {
  const currentLevelThreshold = getTotalXPForLevel(currentLevel)
  const nextLevelThreshold = getTotalXPForLevel(currentLevel + 1)
  return nextLevelThreshold - currentLevelThreshold
}

/**
 * Calculate progress percentage to next level (0-100)
 */
export function getLevelProgress(currentXP: number, level: number): number {
  const currentLevelThreshold = getTotalXPForLevel(level)
  const nextLevelThreshold = getTotalXPForLevel(level + 1)

  const xpInCurrentLevel = currentXP - currentLevelThreshold
  const xpNeededForThisLevel = nextLevelThreshold - currentLevelThreshold

  if (xpNeededForThisLevel <= 0) return 0

  return Math.max(0, Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForThisLevel) * 100)))
}
