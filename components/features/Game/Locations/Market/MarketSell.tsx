import { type TradeItem, TradePanel } from '@/components/features/Game/Shared/components/TradePanel'

import type { MarketItem } from './types'

interface MarketSellProps {
  inventory: MarketItem[]
  handleSell: (item: MarketItem) => void
  disabled?: boolean
}

export function MarketSell({ inventory, handleSell, disabled = false }: MarketSellProps) {
  // Map MarketItem to TradeItem
  const tradeItems: TradeItem[] = inventory.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    icon: item.icon,
    price: Math.floor(item.price * 0.5), // Sell for 50%
    equipped: item.equipped,
    canHaggle: false, // Haggle removed
  }))

  return (
    <TradePanel
      items={tradeItems}
      onAction={(tradeItem: TradeItem) => {
        // Find original item
        const originalItem = inventory.find((i) => i.id === tradeItem.id)
        if (originalItem) handleSell(originalItem)
      }}
      onHaggle={() => {}} // No-op
      actionLabel="Prodat"
      emptyMessage="Tvůj batoh je prázdný."
      haggledItems={{}} // Empty
      disabled={disabled}
    />
  )
}
