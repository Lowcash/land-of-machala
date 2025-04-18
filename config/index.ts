import { QuestIdent } from '@prisma/client'

import { ROUTE } from './routes'

export const DIRECTIONS = ['left', 'right', 'up', 'down'] as const

export const WEARABLES = ['left_weapon', 'right_weapon', 'weapon', 'armor', 'potion'] as const

export const QUESTS = [QuestIdent.SLAIN_ENEMY, QuestIdent.SLAIN_TROLL] as const
export const QUEST_STATE = ['waiting', 'ready', 'progress', 'complete', 'done'] as const

export const LOCATION = {
  'forest': '/images/environment/forest.webp',
  'inventory': '/images/environment/inventory.jpeg',
  'quest': '/images/environment/quest.jpeg',
  'city': '/images/environment/city.avif',
  'hospital': '/images/environment/hospital.webp',
  'armory': '/images/environment/armory.jpg',
  'bank': '/images/environment/bank.webp',
} as const

export type Location = Array<keyof typeof LOCATION>[number]

export enum ERROR_CAUSE {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NO_PERMISSION = 'NO_PERMISSION',
  ENTITY_NOT_EXIST = 'ENTITY_NOT_EXIST',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CANNOT_MOVE = 'CANNOT_MOVE',
  COMBAT = 'COMBAT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
}

export const PAGE_COOKIE_KEY = 'page'

export type Route = keyof typeof ROUTE

export * from './routes'
export * from './query-keys'
export * from './cache-keys'

export const BASE_HP_ACTUAL = 100
export const BASE_HP_MAX = 100
export const BASE_XP_ACTUAL = 0
export const BASE_XP_MAX = 100

export const BASE_MIN_DAMAGE = 0
export const BASE_MAX_DAMAGE = 1

export const STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.25
export const AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1
export const INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1

export const EMPTY = '-'