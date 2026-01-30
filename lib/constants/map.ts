import type { LucideIcon } from 'lucide-react'
import { Castle, Home, Lock, MapPin, Mountain, Trees } from 'lucide-react'

export interface LegendItem {
  readonly id: string
  readonly icon: LucideIcon
  readonly label: string
  readonly description: string
  readonly color: string
  readonly filterKey?: keyof {
    showTowns: boolean
    showWilderness: boolean
    showDungeons: boolean
    showLandmarks: boolean
  }
}

export const MAP_LEGEND_ITEMS: readonly LegendItem[] = [
  {
    id: 'player',
    icon: MapPin,
    label: 'Tvá pozice',
    description: 'Aktuální lokace',
    color: '#69ccf0',
  },
  {
    id: 'town',
    icon: Home,
    label: 'Město',
    description: 'Bezpečné oblasti',
    color: '#ffd700',
    filterKey: 'showTowns',
  },
  {
    id: 'wilderness',
    icon: Trees,
    label: 'Divočina',
    description: 'Střední nebezpečí',
    color: '#6fbf6f',
    filterKey: 'showWilderness',
  },
  {
    id: 'dungeon',
    icon: Castle,
    label: 'Dungeon',
    description: 'Vysoké nebezpečí',
    color: '#ff6b6b',
    filterKey: 'showDungeons',
  },
  {
    id: 'landmark',
    icon: Mountain,
    label: 'Zajímavost',
    description: 'Speciální místa',
    color: '#b66bd4',
    filterKey: 'showLandmarks',
  },
  {
    id: 'locked',
    icon: Lock,
    label: 'Uzamčeno',
    description: 'Vyžaduje level',
    color: '#8b6f47',
  },
] as const

export const MAP_LEGEND_TIP =
  'Klikni na lokaci pro zobrazení detailů a cestování. Číslo u lokace označuje doporučený level.' as const
