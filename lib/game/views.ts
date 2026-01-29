import type { LucideIcon } from 'lucide-react'
import { Backpack, Map as MapIcon, ScrollText, TrendingUp, User } from 'lucide-react'

import type { RandomEvent } from '@/types/events'

import type { AppRoute } from '@/lib/types/game'

export interface NavItem {
  id: string
  icon: LucideIcon
  label: string
  path: AppRoute
}

export const GAME_NAV_ITEMS: NavItem[] = [
  { id: 'character', icon: User, label: 'Postava', path: '/character' },
  { id: 'skills', icon: TrendingUp, label: 'Dovednosti', path: '/skills' },
  { id: 'quests', icon: ScrollText, label: 'Questy', path: '/quests' },
  { id: 'inventory', icon: Backpack, label: 'Inventář', path: '/inventory' },
  { id: 'map', icon: MapIcon, label: 'Mapa', path: '/map' },
]

export function getEventTypeColor(type: RandomEvent['type']) {
  switch (type) {
    case 'combat':
      return 'border-red-500/30 bg-red-900/20'
    case 'treasure':
      return 'border-yellow-500/30 bg-yellow-900/20'
    case 'flavor':
      return 'border-purple-500/30 bg-purple-900/20'
    default:
      return 'border-slate-500/30 bg-slate-900/20'
  }
}

export function getEventTypeIconColor(type: RandomEvent['type']) {
  switch (type) {
    case 'combat':
      return 'text-red-400'
    case 'treasure':
      return 'text-yellow-400'
    case 'flavor':
      return 'text-purple-400'
    default:
      return 'text-slate-400'
  }
}
