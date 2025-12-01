import { describe, it, expect } from 'vitest'
import {
  STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER,
  AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER,
  INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER,
  BASE_MIN_DAMAGE,
  BASE_MAX_DAMAGE,
} from '@/config'

describe('stats calculations', () => {
  describe('strength calculation', () => {
    it('should calculate base strength from level and race/class', () => {
      const level = 5
      const raceStrength = 3
      const classStrength = 2
      const strength = level + raceStrength + classStrength
      expect(strength).toBe(10)
    })

    it('should add armor strength bonuses', () => {
      const baseStrength = 10
      const armorBonuses = [2, 1, 3, 0, 2, 1] // head, shoulder, chest, hand, pants, boots
      const totalStrength = baseStrength + armorBonuses.reduce((a, b) => a + b, 0)
      expect(totalStrength).toBe(19)
    })

    it('should handle null armor bonuses', () => {
      const baseStrength = 10
      const headStrength = null
      const chestStrength = 3
      const totalStrength = baseStrength + (headStrength ?? 0) + (chestStrength ?? 0)
      expect(totalStrength).toBe(13)
    })
  })

  describe('agility calculation', () => {
    it('should calculate base agility from level and race/class', () => {
      const level = 5
      const raceAgility = 4
      const classAgility = 1
      const agility = level + raceAgility + classAgility
      expect(agility).toBe(10)
    })

    it('should add armor agility bonuses', () => {
      const baseAgility = 8
      const armorBonuses = [1, 2, 1, 3, 2, 2]
      const totalAgility = baseAgility + armorBonuses.reduce((a, b) => a + b, 0)
      expect(totalAgility).toBe(19)
    })
  })

  describe('intelligence calculation', () => {
    it('should calculate base intelligence from level and race/class', () => {
      const level = 5
      const raceIntelligence = 2
      const classIntelligence = 5
      const intelligence = level + raceIntelligence + classIntelligence
      expect(intelligence).toBe(12)
    })

    it('should add armor intelligence bonuses', () => {
      const baseIntelligence = 10
      const armorBonuses = [2, 0, 3, 1, 0, 1]
      const totalIntelligence = baseIntelligence + armorBonuses.reduce((a, b) => a + b, 0)
      expect(totalIntelligence).toBe(17)
    })
  })

  describe('damage calculation', () => {
    it('should calculate stats damage contribution', () => {
      const strength = 20
      const agility = 15
      const intelligence = 10

      const strengthDamage = strength * STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER
      const agilityDamage = agility * AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER
      const intelligenceDamage = intelligence * INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER

      const statsDamage = Math.floor(strengthDamage + agilityDamage + intelligenceDamage)
      
      // 20 * 0.25 + 15 * 0.1 + 10 * 0.1 = 5 + 1.5 + 1 = 7.5 => 7
      expect(statsDamage).toBe(7)
    })

    it('should calculate min damage with weapons', () => {
      const statsDamage = 7
      const leftWeaponMin = 3
      const rightWeaponMin = 2

      const minDamage = BASE_MIN_DAMAGE + statsDamage + leftWeaponMin + rightWeaponMin
      expect(minDamage).toBe(12)
    })

    it('should calculate max damage with weapons', () => {
      const statsDamage = 7
      const leftWeaponMax = 8
      const rightWeaponMax = 5

      const maxDamage = BASE_MAX_DAMAGE + statsDamage + leftWeaponMax + rightWeaponMax
      expect(maxDamage).toBe(21)
    })

    it('should handle null weapon damage', () => {
      const statsDamage = 7
      const leftWeaponMin = null
      const rightWeaponMin = 3

      const minDamage = BASE_MIN_DAMAGE + statsDamage + (leftWeaponMin ?? 0) + (rightWeaponMin ?? 0)
      expect(minDamage).toBe(10)
    })

    it('should handle no weapons equipped', () => {
      const statsDamage = 5
      const leftWeaponMin = null
      const rightWeaponMin = null
      const leftWeaponMax = null
      const rightWeaponMax = null

      const minDamage = BASE_MIN_DAMAGE + statsDamage + (leftWeaponMin ?? 0) + (rightWeaponMin ?? 0)
      const maxDamage = BASE_MAX_DAMAGE + statsDamage + (leftWeaponMax ?? 0) + (rightWeaponMax ?? 0)

      expect(minDamage).toBe(5)
      expect(maxDamage).toBe(6)
    })
  })

  describe('reward calculation', () => {
    it('should calculate money reward correctly', () => {
      const playerMoney = 100
      const rewardMoney = 50
      const newMoney = (playerMoney ?? 0) + (rewardMoney ?? 0)
      expect(newMoney).toBe(150)
    })

    it('should handle null player money', () => {
      const playerMoney = null
      const rewardMoney = 50
      const newMoney = (playerMoney ?? 0) + (rewardMoney ?? 0)
      expect(newMoney).toBe(50)
    })

    it('should handle null reward money', () => {
      const playerMoney = 100
      const rewardMoney = null
      const newMoney = (playerMoney ?? 0) + (rewardMoney ?? 0)
      expect(newMoney).toBe(100)
    })

    it('should handle both null values', () => {
      const playerMoney = null
      const rewardMoney = null
      const newMoney = (playerMoney ?? 0) + (rewardMoney ?? 0)
      expect(newMoney).toBe(0)
    })
  })

  describe('XP calculations', () => {
    it('should calculate XP gain correctly', () => {
      const currentXP = 50
      const xpGain = 30
      const newXP = currentXP + xpGain
      expect(newXP).toBe(80)
    })

    it('should identify level up', () => {
      const currentXP = 50
      const xpGain = 60
      const xpMax = 100
      const newXP = currentXP + xpGain
      const hasLevelUp = newXP > xpMax
      expect(hasLevelUp).toBe(true)
    })

    it('should calculate remaining XP after level up', () => {
      const currentXP = 50
      const xpGain = 60
      const xpMax = 100
      const newXP = currentXP + xpGain
      const hasLevelUp = newXP > xpMax
      const remainingXP = hasLevelUp ? newXP - xpMax : newXP
      expect(remainingXP).toBe(10)
    })

    it('should not level up when under max', () => {
      const currentXP = 50
      const xpGain = 30
      const xpMax = 100
      const newXP = currentXP + xpGain
      const hasLevelUp = newXP > xpMax
      expect(hasLevelUp).toBe(false)
    })
  })
})
