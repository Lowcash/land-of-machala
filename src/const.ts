import { Profession, Race } from '@prisma/client'

export const BASE_DIRECTIONS = ['left', 'right'] as const
export type BaseDirection = (typeof BASE_DIRECTIONS)[number]

export const DIRECTIONS = [...BASE_DIRECTIONS, 'up', 'down'] as const
export type Direction = (typeof DIRECTIONS)[number]

export type Position = {
  x: number
  y: number
}

export const WEARABLES = ['left_weapon', 'right_weapon', 'weapon', 'armor'] as const
export type Wearable = (typeof WEARABLES)[number]

export const RACES = [Race.HUMAN, Race.GNOME, Race.DWARF] as const
export const PROFESSIONS = [Profession.WARRIOR, Profession.SAMURAI, Profession.MAGE] as const

export const ROUTE = {
  HOME: '/',
  INVENTORY: '/inventory',
} as const
