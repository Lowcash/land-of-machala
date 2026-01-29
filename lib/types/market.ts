import type { ItemTypes } from '@/lib/game/constants/mechanics'

import type { TradeableItem } from '@/components/features/Game/Shared/components/types'

export type MarketItemType = ItemTypes

export type MarketItem = TradeableItem

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
