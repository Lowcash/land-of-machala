import {
  Beer,
  Building,
  Cross,
  Hammer,
  type LucideIcon,
  ScrollText,
  ShoppingBag,
  Trees,
} from 'lucide-react'

import type { View } from '@/lib/types/game'

export const TOWN_CONFIG = {
  title: 'Náměstí Machaly',
  description: 'Střed všeho dění. Vzduch je cítit kouřem z kovárny a vůní pečeného masa z hospody.',
}

export interface TownAction {
  id: string
  title: string
  icon: LucideIcon
  view: View
  variant: 'large' | 'compact'
  variantOverride?: 'primary' | 'secondary' | 'danger' | 'success' | 'forest' | 'ghost' | 'default'
  className?: string
}

export const TOWN_ACTIONS: TownAction[] = [
  {
    id: 'market',
    title: 'Tržiště',
    icon: ShoppingBag,
    view: 'market',
    variant: 'large',
  },
  {
    id: 'smith',
    title: 'Kovárna',
    icon: Hammer,
    view: 'smith',
    variant: 'large',
  },
  {
    id: 'tavern',
    title: 'Hospoda',
    icon: Beer,
    view: 'tavern',
    variant: 'large',
  },
  {
    id: 'bank',
    title: 'Banka',
    icon: Building,
    view: 'bank',
    variant: 'large',
  },
  {
    id: 'healer',
    title: 'Léčitel',
    icon: Cross,
    view: 'healer',
    variant: 'large',
  },
  {
    id: 'board',
    title: 'Vývěska úkolů',
    icon: ScrollText,
    view: 'board',
    variant: 'compact',
    className: 'col-span-full',
  },
  {
    id: 'forest',
    title: 'Temný Hvozd',
    icon: Trees,
    view: 'forest',
    variant: 'large',
    className: 'col-span-full',
    variantOverride: 'forest',
  },
]
