import { describe, it, expect, vi } from 'vitest'
import { getI18n } from '@/entity/class'

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
    class: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
    },
  },
}))

// Mock cache
vi.mock('@/lib/cache', () => ({
  CACHE: {},
}))

// Mock config
vi.mock('@/config', () => ({
  CACHE_KEY: {
    CLASSES: 'classes',
  },
}))

describe('entity/class', () => {
  describe('getI18n', () => {
    it('should return translated name and description for warrior', () => {
      const class_ = {
        id: 'warrior',
        i18n_key: 'class.warrior',
        order_index: 1,
        strength: 14,
        agility: 10,
        intelligence: 6,
      }

      const result = getI18n(class_)

      expect(result).toEqual({
        name: 'translated_class.warrior.header',
        description: 'translated_class.warrior.description',
      })
    })

    it('should return translated name and description for samurai', () => {
      const class_ = {
        id: 'samurai',
        i18n_key: 'class.samurai',
        order_index: 2,
        strength: 10,
        agility: 14,
        intelligence: 6,
      }

      const result = getI18n(class_)

      expect(result).toEqual({
        name: 'translated_class.samurai.header',
        description: 'translated_class.samurai.description',
      })
    })

    it('should return translated name and description for mage', () => {
      const class_ = {
        id: 'mage',
        i18n_key: 'class.mage',
        order_index: 3,
        strength: 8,
        agility: 6,
        intelligence: 16,
      }

      const result = getI18n(class_)

      expect(result).toEqual({
        name: 'translated_class.mage.header',
        description: 'translated_class.mage.description',
      })
    })

    it('should handle empty i18n_key', () => {
      const class_ = {
        id: 'test',
        i18n_key: '',
        order_index: 0,
        strength: 0,
        agility: 0,
        intelligence: 0,
      }

      const result = getI18n(class_)

      expect(result).toEqual({
        name: 'translated_.header',
        description: 'translated_.description',
      })
    })
  })
})
