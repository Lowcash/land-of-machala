export const BASE_DIRECTIONS = ['left', 'right'] as const
export type BaseDirection = (typeof BASE_DIRECTIONS)[number]

export const DIRECTIONS = [...BASE_DIRECTIONS, 'up', 'down'] as const
export type Direction = (typeof DIRECTIONS)[number]

export type Position = {
  x: number
  y: number
}

export const WEARABLE = ['weapon', 'armor'] as const
export type Wearable = (typeof WEARABLE)[number]
