import type { LucideIcon } from 'lucide-react'

import type { ServiceActions } from '@/lib/game/constants/mechanics'

export interface TradeableItem {
  id: number | string
  name: string
  description?: string
  price: number
  icon: LucideIcon
  type?: string

  // Stats & Effects
  attack?: number
  defense?: number
  healing?: number
  mana?: number
  durability?: number
  maxDurability?: number
  level?: number

  // Logic
  action?: ServiceActions

  // UI Props
  iconColor?: string
  iconBg?: string
  equipped?: boolean
  canHaggle?: boolean
}
