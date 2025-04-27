import { QuestIdent } from '@prisma/client'

export const DIRECTIONS = ['left', 'right', 'up', 'down'] as const

export const WEARABLES = ['left_weapon', 'right_weapon', 'weapon', 'armor', 'potion'] as const

export const QUESTS = [QuestIdent.SLAIN_ENEMY, QuestIdent.SLAIN_TROLL] as const
export const QUEST_STATE = ['waiting', 'ready', 'progress', 'complete', 'done'] as const

export const LOCATION = {
  inventory: '/images/environment/inventory.jpg',
  quest: '/images/environment/quest.jpg',
  main_city: '/images/environment/city.jpg',
  hospital: '/images/environment/hospital.jpg',
  armory: '/images/environment/armory.jpg',
  bank: '/images/environment/bank.jpg',
  forest: '/images/environment/forest/2.jpg',
  forest_clearing: '/images/environment/forest_clearing/0.jpg',
  cemetery: '/images/environment/cemetery/0.jpg',
  desert: '/images/environment/desert/0.jpg',
  farmstead: '/images/environment/farmstead/0.jpg',
  hills: '/images/environment/hills/0.jpg',
  road: '/images/environment/road/2.jpg',
  castle_suburb: '/images/environment/castle_suburb/1.jpg',
  lake: '/images/environment/lake/0.jpg',
  swamp: '/images/environment/swamp/0.jpg',
} as const

export enum ERROR_CAUSE {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NO_PERMISSION = 'NO_PERMISSION',
  NO_CHARACTER = 'NO_CHARACTER',
  NO_POSITION = 'NO_POSITION',
  ENTITY_NOT_EXIST = 'ENTITY_NOT_EXIST',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CANNOT_MOVE = 'CANNOT_MOVE',
  COMBAT = 'COMBAT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
}

export const PAGE_COOKIE_KEY = 'page'

export * from './routes'
export * from './query-keys'
export * from './cache-keys'

export const BASE_SPAWN_X = 0
export const BASE_SPAWN_Y = 0

export const BASE_HP_ACTUAL = 100
export const BASE_HP_MAX = 100
export const BASE_XP_ACTUAL = 0
export const BASE_XP_MAX = 100

export const BASE_MIN_DAMAGE = 0
export const BASE_MAX_DAMAGE = 1

export const STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.25
export const AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1
export const INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1
