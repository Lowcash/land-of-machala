import type { LucideIcon } from 'lucide-react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'

export type Direction = 'north' | 'south' | 'east' | 'west'

export interface DirectionConfig {
  readonly direction: Direction
  readonly label: string
  readonly subLabel: string
  readonly icon: LucideIcon
  readonly bg: string
}

/**
 * Direction configurations for game movement
 */
export const GAME_DIRECTIONS: readonly DirectionConfig[] = [
  {
    direction: 'north',
    label: 'Sever',
    subLabel: 'Hory, Doly',
    icon: ArrowUp,
    bg: '/assets/locations/mountains-background.jpg',
  },
  {
    direction: 'south',
    label: 'Jih',
    subLabel: 'Pláně, Farmy',
    icon: ArrowDown,
    bg: '/assets/locations/plains-background.jpg',
  },
  {
    direction: 'east',
    label: 'Východ',
    subLabel: 'Poušť, Oáza',
    icon: ArrowRight,
    bg: '/assets/locations/desert-background.jpg',
  },
  {
    direction: 'west',
    label: 'Západ',
    subLabel: 'Temný les',
    icon: ArrowLeft,
    bg: '/assets/locations/forest-background.jpg',
  },
] as const

export const GAME_ACTION_LABELS = {
  STAY_IN_TOWN: 'Zůstat ve městě',
  BACK_TO_TOWN: 'Vrátit se do města',
} as const
