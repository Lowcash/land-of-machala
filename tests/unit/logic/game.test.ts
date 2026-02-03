import { describe, expect, it } from 'vitest'

import { ClassId } from '@/lib/game/constants/mechanics'
import { calculateCritChance, calculateDodgeChance, calculatePercentage } from '@/lib/game/formulas'
import { isCasterClass, isTankClass } from '@/lib/game/onboarding'

describe('Game Logic', () => {
  describe('Formulas', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50)
      expect(calculatePercentage(0, 100)).toBe(0)
      expect(calculatePercentage(200, 100)).toBe(100) // Clamping
      expect(calculatePercentage(-50, 100)).toBe(0) // Clamping
      expect(calculatePercentage(50, 0)).toBe(0) // Div by zero
    })

    it('calculates crit chance', () => {
      // 0.2 per agility
      expect(calculateCritChance(10)).toBe(2.0)
      expect(calculateCritChance(0)).toBe(0)
      expect(calculateCritChance(1000)).toBe(50) // Cap
    })

    it('calculates dodge chance', () => {
      // 0.15 per agility
      expect(calculateDodgeChance(10)).toBe(1.5)
      expect(calculateDodgeChance(100)).toBe(15.0)
      expect(calculateDodgeChance(1000)).toBe(50) // Cap
    })
  })

  describe('Onboarding', () => {
    it('identifies caster classes', () => {
      expect(isCasterClass(ClassId.MAGE)).toBe(true)
      expect(isCasterClass(ClassId.NECROMANCER)).toBe(true)
      expect(isCasterClass(ClassId.WARRIOR)).toBe(false)
    })

    it('identifies tank classes', () => {
      expect(isTankClass(ClassId.WARRIOR)).toBe(true)
      expect(isTankClass(ClassId.PALADIN)).toBe(true)
      expect(isTankClass(ClassId.ROGUE)).toBe(false)
    })
  })
})
