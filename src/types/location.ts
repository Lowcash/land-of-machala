export const BASE_DIRECTIONS = ['left', 'right'] as const
export type TBaseDirection = (typeof BASE_DIRECTIONS)[number]

export const DIRECTIONS = [...BASE_DIRECTIONS, 'up', 'down'] as const
export type TDirection = (typeof DIRECTIONS)[number]

export type TPosition = {
  x: number
  y: number
}
