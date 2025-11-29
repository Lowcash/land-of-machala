import { describe, it, expect, vi } from 'vitest'
import { showCreate } from '@/app/actions/player'
import { resolveActionResult } from '@/lib/safe-action-client-utils'

// Mock server-only to avoid import restrictions in tests
vi.mock('server-only', () => ({}))

// Mock next-intl getTranslations
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => Promise.resolve((key: string) => `translated_${key}`)),
}))

// Mock all dependencies
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    race: {
      findFirst: vi.fn(),
    },
    class: {
      findFirst: vi.fn(),
    },
  },
}))

vi.mock('@/entity/race', () => ({
  get: vi.fn(),
}))

vi.mock('@/entity/class', () => ({
  get: vi.fn(),
}))

vi.mock('@/entity/stats', () => ({
  create: vi.fn(),
}))

vi.mock('@/entity/wearable', () => ({
  create: vi.fn(),
}))

vi.mock('@/lib/safe-action', () => ({
  actionClient: vi.fn(() => ({
    input: vi.fn(() => ({
      handler: vi.fn((fn) => async () => [fn(), null]),
    })),
  })),
  authProcedure: {
    createServerAction: vi.fn(() => ({
      input: vi.fn(() => ({
        handler: vi.fn((fn) => async () => [fn(), null]),
      })),
    })),
  },
  playerProcedure: {
    createServerAction: vi.fn(() => ({
      input: vi.fn(() => ({
        handler: vi.fn((fn) => async () => [fn(), null]),
      })),
    })),
  },
  handleValidationErrorsShape: vi.fn(),
}))

vi.mock('@/zod-schema/player', () => ({
  createPlayerSchema: vi.fn(),
  playerMoveSchema: vi.fn(),
}))

vi.mock('@/config', () => ({
  BASE_HP_ACTUAL: 100,
  BASE_HP_MAX: 100,
  BASE_XP_ACTUAL: 0,
  BASE_XP_MAX: 100,
  ERROR_CAUSE: {
    NOT_AVAILABLE: 'NOT_AVAILABLE',
  },
}))

describe('app/actions/player', () => {
  describe('showCreate', () => {
    it('should return translated text', async () => {
      const result = await resolveActionResult(showCreate())

      expect(result).toEqual({
        text: {
          name: 'translated_character.name.header',
          race: 'translated_race.header',
          class: 'translated_class.header',
          create: 'translated_character.create.header',
          createSuccess: 'translated_character.create.success',
          createFailure: 'translated_character.create.failure',
        },
      })
    })
  })
})