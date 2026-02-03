import { describe, expect, it } from 'vitest'

import { getLevelFromXP, getLevelProgress, getTotalXPForLevel } from '@/lib/game/progression'
import { formatGold, formatNumber, randomInt } from '@/lib/utils'

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

describe('getTotalXPForLevel', () => {
  it('calculates XP needed for level', () => {
    expect(getTotalXPForLevel(1)).toBe(0)
    expect(getTotalXPForLevel(2)).toBe(100)
    expect(getTotalXPForLevel(10)).toBeGreaterThan(getTotalXPForLevel(5))
  })
})

describe('getLevelFromXP', () => {
  it('calculates level from total XP', () => {
    expect(getLevelFromXP(0)).toBe(1)
    expect(getLevelFromXP(100)).toBe(2)
    expect(getLevelFromXP(500)).toBeGreaterThanOrEqual(2)
  })
})

describe('getLevelProgress', () => {
  it('calculates progress percentage', () => {
    const progress = getLevelProgress(50, 2)
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
