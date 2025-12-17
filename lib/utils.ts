import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format gold with icon
 */
export function formatGold(amount: number): string {
  return `${formatNumber(amount)} 🪙`
}

/**
 * Calculate experience needed for next level
 */
const BASE_XP = 100
const XP_MULTIPLIER = 1.5

export function calculateXPForLevel(level: number): number {
  return Math.floor(BASE_XP * Math.pow(level, XP_MULTIPLIER))
}

/**
 * Calculate level from total experience
 */
export function calculateLevelFromXP(totalXP: number): number {
  let level = 1
  let xpNeeded = BASE_XP

  while (totalXP >= xpNeeded) {
    level++
    xpNeeded = calculateXPForLevel(level)
  }

  return level
}

/**
 * Calculate progress percentage to next level
 */
export function calculateLevelProgress(currentXP: number, level: number): number {
  const currentLevelXP = level === 1 ? 0 : calculateXPForLevel(level - 1)
  const nextLevelXP = calculateXPForLevel(level)
  const xpInCurrentLevel = currentXP - currentLevelXP
  const xpNeededForLevel = nextLevelXP - currentLevelXP

  return Math.max(0, Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100)))
}

/**
 * Delay execution for ms milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate random number between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
