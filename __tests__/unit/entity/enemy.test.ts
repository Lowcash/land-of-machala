import { describe, it, expect, vi } from 'vitest'
import { getI18n } from '@/entity/enemy'

// Mock server-only to avoid import restrictions in tests
vi.mock('server-only', () => ({}))

// Mock i18n to avoid translation issues in tests
vi.mock('@/lib/i18n', () => ({
  default: {
    t: vi.fn((key: string) => `translated_${key}`), // Mock translation
  },
}))

// Mock db to avoid actual database calls
vi.mock('@/lib/db', () => ({
  db: {
    enemy: {
      findFirst: vi.fn(),
    },
  },
}))

describe('entity/enemy', () => {
  describe('getI18n', () => {
    it('should return translated name and description', () => {
      const enemy = {
        id: 'GOBLIN' as const,
        i18n_key: 'enemy.goblin',
        hp_from: 60,
        hp_to: 90,
        damage_from: 6,
        damage_to: 12,
        xp_from: 10,
        xp_to: 20,
        money_from: 5,
        money_to: 15,
      }

      const result = getI18n(enemy)

      expect(result).toEqual({
        name: 'translated_enemy.goblin.header',
        description: 'translated_enemy.goblin.description',
      })
    })

    it('should handle different enemy types', () => {
      const enemy = {
        id: 'DRAGON' as const,
        i18n_key: 'enemy.dragon',
        hp_from: 200,
        hp_to: 300,
        damage_from: 50,
        damage_to: 100,
        xp_from: 100,
        xp_to: 200,
        money_from: 100,
        money_to: 200,
      }

      const result = getI18n(enemy)

      expect(result).toEqual({
        name: 'translated_enemy.dragon.header',
        description: 'translated_enemy.dragon.description',
      })
    })

    it('should handle empty i18n_key', () => {
      const enemy = {
        id: 'TEST' as const,
        i18n_key: '',
        hp_from: 10,
        hp_to: 20,
        damage_from: 1,
        damage_to: 5,
        xp_from: 1,
        xp_to: 5,
        money_from: 1,
        money_to: 5,
      }

      const result = getI18n(enemy)

      expect(result).toEqual({
        name: 'translated_.header',
        description: 'translated_.description',
      })
    })
  })
})
