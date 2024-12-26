import { Profession, Race } from '@prisma/client'

export const DIRECTIONS = ['left', 'right', 'up', 'down'] as const

export type Position = {
  x: number
  y: number
}

export const WEARABLES = ['left_weapon', 'right_weapon', 'weapon', 'armor', 'potion'] as const

export const RACES = [Race.HUMAN, Race.GNOME, Race.DWARF] as const
export const PROFESSIONS = [Profession.WARRIOR, Profession.SAMURAI, Profession.MAGE] as const

export enum ERROR_CAUSE {
  ENTITY_NOT_EXIST = "ENTITY_NOT_EXIST",
  NOT_AVAILABLE = "NOT_AVAILABLE",
  CANNOT_MOVE = "CANNOT_MOVE",
  COMBAT = "COMBAT",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
}

export const ROUTE = {
  WORLD: '/world',
  QUEST: '/quest',
  INVENTORY: '/inventory',
} as const

export type Route = keyof typeof ROUTE

export const CACHE_KEY = {
  ARMORS: 'armors',
} as const

export const QUERY_KEY = {
  INFO: 'info-key',
  PLAYER: 'player-key',
  STATS: 'stats-key',
  SESSION: 'session-key',
  WEARABLE: 'wearable-key',
  INVENTORY: 'inventory-key',
  HOSPITAL: 'hospital-key',
  ARMORY: 'armory-key',
  BANK: 'bank-key',
  BANK_ACCOUNT: 'bank-account-key',
} as const

export const PAGE_COOKIE_KEY = 'page'
