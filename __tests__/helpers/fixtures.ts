import { vi } from 'vitest'
import type { User } from '@prisma/client'

/**
 * Creates a mock user with custom overrides
 */
export const createMockUser = (overrides: Partial<User> = {}): User => ({
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
  ...overrides,
})

/**
 * Creates a mock inventory
 */
export const createMockInventory = (overrides = {}) => ({
  id: 'inventory-1',
  weapons_inventory: [],
  armors_inventory: [],
  potions_inventory: [],
  ...overrides,
})

/**
 * Creates a mock bank account
 */
export const createMockBankAccount = (overrides = {}) => ({
  id: 'bank-account-1',
  bank_id: 'bank-1',
  user_id: 'test-user-id',
  money: 0,
  weapons: [],
  armors: [],
  potions: [],
  ...overrides,
})

/**
 * Creates a mock user quest
 */
export const createMockUserQuest = (overrides = {}) => ({
  id: 'user-quest-1',
  quest_slain_enemy_id: null,
  quest_slain_troll_id: null,
  quest_slain_enemy: null,
  quest_slain_troll: null,
  quest_slain_enemy_complete: false,
  quest_slain_enemy_done: false,
  quest_slain_troll_complete: false,
  quest_slain_troll_done: false,
  ...overrides,
})

/**
 * Creates a mock enemy instance
 */
export const createMockEnemyInstance = (overrides = {}) => ({
  id: 'enemy-instance-1',
  enemy_id: 'enemy-1',
  hp_actual: 50,
  hp_max: 50,
  enemy: {
    id: 'enemy-1',
    name: 'Test Enemy',
    i18n_key: 'enemy.test',
    hp_from: 40,
    hp_to: 60,
    damage_from: 5,
    damage_to: 10,
    xp_from: 10,
    xp_to: 20,
    money_from: 5,
    money_to: 15,
  },
  ...overrides,
})

/**
 * Creates a mock loot
 */
export const createMockLoot = (overrides = {}) => ({
  id: 'loot-1',
  money: 10,
  weapons_loot: [],
  armors_loot: [],
  ...overrides,
})

/**
 * Creates a mock place
 */
export const createMockPlace = (overrides = {}) => ({
  id: 'place-1',
  name: 'Test Place',
  i18n_key: 'place.test',
  x_min: -10,
  x_max: 10,
  y_min: -10,
  y_max: 10,
  place_type: 'SAFEHOUSE',
  hospital: null,
  armory: null,
  bank: null,
  ...overrides,
})
