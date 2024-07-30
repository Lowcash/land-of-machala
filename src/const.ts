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
  ENTITY_NOT_EXIST,
  NOT_AVAILABLE
}

export const ROUTE = {
  WORLD: '/world',
  QUEST: '/quest',
  INVENTORY: '/inventory'
} as const

export const QUERY = {
  PLAYER_INFO: 'player-info'
} as const