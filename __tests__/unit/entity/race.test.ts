import { describe, it, expect, vi } from 'vitest'
import { getI18n } from '@/entity/race'

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
    race: {
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
    RACES: 'races',
  },
}))

describe('entity/race', () => {
  describe('getI18n', () => {
    it('should return translated name and description for human', () => {
      const race = {
        id: 'human',
        i18n_key: 'race.human',
        order_index: 1,
        strength: 10,
        agility: 10,
        intelligence: 10,
      }

      const result = getI18n(race)

      expect(result).toEqual({
        name: 'translated_race.human.header',
        description: 'translated_race.human.description',
      })
    })

    it('should return translated name and description for dwarf', () => {
      const race = {
        id: 'dwarf',
        i18n_key: 'race.dwarf',
        order_index: 2,
        strength: 12,
        agility: 10,
        intelligence: 8,
      }

      const result = getI18n(race)

      expect(result).toEqual({
        name: 'translated_race.dwarf.header',
        description: 'translated_race.dwarf.description',
      })
    })

    it('should return translated name and description for gnome', () => {
      const race = {
        id: 'gnome',
        i18n_key: 'race.gnome',
        order_index: 3,
        strength: 8,
        agility: 10,
        intelligence: 12,
      }

      const result = getI18n(race)

      expect(result).toEqual({
        name: 'translated_race.gnome.header',
        description: 'translated_race.gnome.description',
      })
    })

    it('should handle empty i18n_key', () => {
      const race = {
        id: 'test',
        i18n_key: '',
        order_index: 0,
        strength: 0,
        agility: 0,
        intelligence: 0,
      }

      const result = getI18n(race)

      expect(result).toEqual({
        name: 'translated_.header',
        description: 'translated_.description',
      })
    })
  })
})