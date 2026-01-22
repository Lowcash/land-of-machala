import type { LucideIcon } from 'lucide-react'

export type MarketItemType = 'weapon' | 'armor' | 'consumable'

export interface MarketItem {
  id: number
  name: string
  type: MarketItemType
  icon: LucideIcon
  price: number // keeping price to match current usage, map to value if needed
  attack?: number
  defense?: number
  durability?: number
  maxDurability?: number
  level?: number
  equipped?: boolean
  healing?: number
  mana?: number
}

export interface MarketActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
  setInfoText: (text: string) => void
}

export interface HaggleState {
  price: number
  success: boolean
  attempted: boolean
}
