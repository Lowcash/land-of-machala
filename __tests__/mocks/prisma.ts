import { vi } from 'vitest'

// Mock PrismaClient
export const mockPrismaClient = {
  user: {
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  inventory: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  quest: {
    findFirst: vi.fn(),
  },
  userQuest: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  questSlainEnemy: {
    create: vi.fn(),
    delete: vi.fn(),
  },
  questSlainTroll: {
    create: vi.fn(),
    delete: vi.fn(),
  },
  slain: {
    create: vi.fn(),
    delete: vi.fn(),
  },
  bankAccount: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  bank: {
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  hospital: {
    findFirst: vi.fn(),
  },
  place: {
    findFirst: vi.fn(),
  },
  enemyInPlace: {
    findMany: vi.fn(),
  },
  enemyInstance: {
    update: vi.fn(),
    delete: vi.fn(),
  },
  weapon: {
    findFirst: vi.fn(),
    count: vi.fn(),
  },
  armor: {
    findFirst: vi.fn(),
    count: vi.fn(),
  },
  loot: {
    create: vi.fn(),
    delete: vi.fn(),
  },
  weaponInInventory: {
    create: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  armorInInventory: {
    create: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  potionInInventory: {
    create: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  weaponInLoot: {
    deleteMany: vi.fn(),
  },
  armorInLoot: {
    deleteMany: vi.fn(),
  },
  weaponInBank: {
    delete: vi.fn(),
  },
  armorInBank: {
    delete: vi.fn(),
  },
  potionInBank: {
    delete: vi.fn(),
  },
  wearable: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  $transaction: vi.fn((callback) => callback(mockPrismaClient)),
}

vi.mock('@/lib/db', () => ({
  db: mockPrismaClient,
}))

export const resetMocks = () => {
  Object.values(mockPrismaClient).forEach((value) => {
    if (typeof value === 'object' && value !== null) {
      Object.values(value).forEach((fn) => {
        if (typeof fn === 'function' && 'mockReset' in fn) {
          (fn as ReturnType<typeof vi.fn>).mockReset()
        }
      })
    }
  })
}
