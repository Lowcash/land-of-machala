export const DIRECTIONS = ['up', 'down', 'left', 'right'] as const
export type TDirection = (typeof DIRECTIONS)[number]

export type TPosition = {
  x: number
  y: number
}
