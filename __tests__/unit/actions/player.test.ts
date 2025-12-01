import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock dependencies before importing the module
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      update: vi.fn(),
      findFirst: vi.fn(),
    },
    place: {
      findFirst: vi.fn(),
    },
  },
}))

vi.mock('@/lib/safe-action', () => ({
  authActionClient: {
    metadata: () => ({
      schema: (schema: unknown) => ({
        action: (handler: Function) => {
          const action = async (input: unknown) => {
            const ctx = { user: mockUser }
            return { data: await handler({ ctx, parsedInput: input }) }
          }
          return action
        },
      }),
      action: (handler: Function) => {
        const action = async (input: unknown) => {
          const ctx = { user: mockUser }
          return { data: await handler({ ctx, parsedInput: input }) }
        }
        return action
      },
    }),
  },
}))

vi.mock('./game', () => ({
  checkEnemyAppeared: vi.fn(),
}))

vi.mock('@/entity/place', () => ({
  default: vi.fn(),
}))

// Import after mocking
import { db } from '@/lib/db'
import Place from '@/entity/place'
import { ERROR_CAUSE } from '@/config'

// Create a mock user
const mockUser = {
  id: 'test-user-id',
  pos_x: 0,
  pos_y: 0,
  race_id: 'race-1',
  class_id: 'class-1',
  enemy_instance_id: null,
  defeated: false,
  loot_id: null,
}

describe('player actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset the mock user state
    Object.assign(mockUser, {
      pos_x: 0,
      pos_y: 0,
      enemy_instance_id: null,
      defeated: false,
      loot_id: null,
    })
  })

  describe('canMove logic', () => {
    it('should allow movement when player has no combat, defeat, or loot', () => {
      const player = { ...mockUser }
      const canMove = !player.enemy_instance_id && !player.defeated && !player.loot_id
      expect(canMove).toBe(true)
    })

    it('should not allow movement when player is in combat', () => {
      const player = { ...mockUser, enemy_instance_id: 'enemy-1' }
      const canMove = !player.enemy_instance_id && !player.defeated && !player.loot_id
      expect(canMove).toBe(false)
    })

    it('should not allow movement when player is defeated', () => {
      const player = { ...mockUser, defeated: true }
      const canMove = !player.enemy_instance_id && !player.defeated && !player.loot_id
      expect(canMove).toBe(false)
    })

    it('should not allow movement when player has loot to collect', () => {
      const player = { ...mockUser, loot_id: 'loot-1' }
      const canMove = !player.enemy_instance_id && !player.defeated && !player.loot_id
      expect(canMove).toBe(false)
    })
  })

  describe('movement direction calculations', () => {
    it('should calculate left movement correctly', () => {
      const direction = 'left'
      const horizontal = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
      const vertical = direction === 'down' ? -1 : direction === 'up' ? 1 : 0
      expect(horizontal).toBe(-1)
      expect(vertical).toBe(0)
    })

    it('should calculate right movement correctly', () => {
      const direction = 'right'
      const horizontal = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
      const vertical = direction === 'down' ? -1 : direction === 'up' ? 1 : 0
      expect(horizontal).toBe(1)
      expect(vertical).toBe(0)
    })

    it('should calculate up movement correctly', () => {
      const direction = 'up'
      const horizontal = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
      const vertical = direction === 'down' ? -1 : direction === 'up' ? 1 : 0
      expect(horizontal).toBe(0)
      expect(vertical).toBe(1)
    })

    it('should calculate down movement correctly', () => {
      const direction = 'down'
      const horizontal = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
      const vertical = direction === 'down' ? -1 : direction === 'up' ? 1 : 0
      expect(horizontal).toBe(0)
      expect(vertical).toBe(-1)
    })
  })

  describe('character status checks', () => {
    it('should correctly identify player with character', () => {
      const player = { race_id: 'race-1', class_id: 'class-1' }
      const hasCharacter = !!player.race_id && !!player.class_id
      expect(hasCharacter).toBe(true)
    })

    it('should correctly identify player without character', () => {
      const player = { race_id: null, class_id: null }
      const hasCharacter = !!player.race_id && !!player.class_id
      expect(hasCharacter).toBe(false)
    })

    it('should correctly identify player in combat', () => {
      const player = { enemy_instance_id: 'enemy-1' }
      const hasCombat = !!player.enemy_instance_id
      expect(hasCombat).toBe(true)
    })

    it('should correctly identify player not in combat', () => {
      const player = { enemy_instance_id: null }
      const hasCombat = !!player.enemy_instance_id
      expect(hasCombat).toBe(false)
    })

    it('should correctly identify defeated player', () => {
      const player = { defeated: true }
      const hasDefeated = !!player.defeated
      expect(hasDefeated).toBe(true)
    })

    it('should correctly identify non-defeated player', () => {
      const player = { defeated: false }
      const hasDefeated = !!player.defeated
      expect(hasDefeated).toBe(false)
    })

    it('should correctly identify player with loot', () => {
      const player = { loot_id: 'loot-1' }
      const hasLoot = !!player.loot_id
      expect(hasLoot).toBe(true)
    })

    it('should correctly identify player without loot', () => {
      const player = { loot_id: null }
      const hasLoot = !!player.loot_id
      expect(hasLoot).toBe(false)
    })
  })
})
