import { vi } from 'vitest'
import type { User } from '@prisma/client'

// Create a mock user for testing
export const mockUser: User = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: null,
  image: null,
  password: 'hashed-password',
  role: null,
  race_id: 'race-1',
  class_id: 'class-1',
  level: 1,
  pos_x: 0,
  pos_y: 0,
  hp_actual: 100,
  hp_max: 100,
  xp_actual: 0,
  xp_max: 100,
  damage_min: 1,
  damage_max: 5,
  money: 100,
  inventory_id: 'inventory-1',
  wearable_id: 'wearable-1',
  user_quest_id: 'user-quest-1',
  loot_id: null,
  defeated: false,
  enemy_instance_id: null,
}

// Mock for authActionClient
export const createMockAction = <TInput, TOutput>(
  handler: (args: { ctx: { user: User }; parsedInput: TInput }) => Promise<TOutput>
) => {
  return (input: TInput) => handler({ ctx: { user: mockUser }, parsedInput: input })
}

// Mock for next-auth session
export const mockGetServerSession = vi.fn(() =>
  Promise.resolve({
    user: {
      email: mockUser.email,
      name: mockUser.name,
    },
  })
)

vi.mock('next-auth/next', () => ({
  getServerSession: () => mockGetServerSession(),
}))
