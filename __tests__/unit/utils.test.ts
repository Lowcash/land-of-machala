import {
  calculateLevelFromXP,
  calculateLevelProgress,
  calculateXPForLevel,
  formatGold,
  formatNumber,
  randomInt,
} from '@/lib/utils'
import { describe, expect, it } from 'vitest'

describe('formatNumber', () => {
  it('formats number with thousand separators', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(42)).toBe('42')
  })
})

describe('formatGold', () => {
  it('formats gold with icon', () => {
    expect(formatGold(100)).toBe('100 🪙')
    expect(formatGold(1500)).toBe('1,500 🪙')
  })
})

describe('calculateXPForLevel', () => {
  it('calculates XP needed for level', () => {
    expect(calculateXPForLevel(1)).toBe(100)
    expect(calculateXPForLevel(2)).toBeGreaterThan(100)
    expect(calculateXPForLevel(10)).toBeGreaterThan(calculateXPForLevel(5))
  })
})

describe('calculateLevelFromXP', () => {
  it('calculates level from total XP', () => {
    expect(calculateLevelFromXP(0)).toBe(1)
    expect(calculateLevelFromXP(100)).toBe(2)
    expect(calculateLevelFromXP(500)).toBeGreaterThanOrEqual(2)
  })
})

describe('calculateLevelProgress', () => {
  it('calculates progress percentage', () => {
    const progress = calculateLevelProgress(50, 2)
    expect(progress).toBeGreaterThanOrEqual(0)
    expect(progress).toBeLessThanOrEqual(100)
  })
})

describe('randomInt', () => {
  it('generates number in range', () => {
    const MIN = 1
    const MAX = 10
    const result = randomInt(MIN, MAX)

    expect(result).toBeGreaterThanOrEqual(MIN)
    expect(result).toBeLessThanOrEqual(MAX)
  })

  it('generates consistent results for same range', () => {
    const result = randomInt(5, 5)
    expect(result).toBe(5)
  })
})
