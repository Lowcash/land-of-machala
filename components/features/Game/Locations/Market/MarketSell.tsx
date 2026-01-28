import { type TradeItem, TradePanel } from '@/components/features/Game/Shared/components/TradePanel'

import type { HaggleState, MarketItem } from './types'

interface MarketSellProps {
  inventory: MarketItem[]
  handleSell: (item: MarketItem) => void
  handleHaggle: (item: MarketItem, buying: boolean, e: React.MouseEvent) => void
  getPrice: (item: MarketItem, buying: boolean) => number
  haggledItems: Record<number, HaggleState>
}

export function MarketSell({
  inventory,
  handleSell,
  handleHaggle,
  getPrice,
  haggledItems,
}: MarketSellProps) {
  // Map MarketItem to TradeItem
  const tradeItems: TradeItem[] = inventory.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    icon: item.icon,
    price: getPrice(item, false),
    equipped: item.equipped,
    canHaggle: true, // Market allows haggling
  }))

  return (
    <TradePanel
      items={tradeItems}
      onAction={(tradeItem: TradeItem) => {
        // Find original item
        const originalItem = inventory.find((i) => i.id === tradeItem.id)
        if (originalItem) handleSell(originalItem)
      }}
      onHaggle={(tradeItem: TradeItem, e: React.MouseEvent) => {
        const originalItem = inventory.find((i) => i.id === tradeItem.id)
        if (originalItem) handleHaggle(originalItem, false, e)
      }}
      actionLabel="Prodat"
      emptyMessage="Tvůj batoh je prázdný."
      haggledItems={haggledItems}
    />
  )
}
