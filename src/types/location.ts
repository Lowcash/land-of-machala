export const DIRECTIONS = ['up', 'down', 'left', 'right'] as const
export type DirectionT = (typeof DIRECTIONS)[number]

export type PositionT = {
  x: number
  y: number
}
