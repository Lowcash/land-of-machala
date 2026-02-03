import { ActionRow, GameIcon } from '@/components/ui/display'
import { GameList } from '@/components/ui/game-list'
import { HStack } from '@/components/ui/stack'
import { Label, Span } from '@/components/ui/typography'

import type { MarketItem } from './types'

interface MarketBuyProps {
  stock: MarketItem[]
  handleBuy: (item: MarketItem) => void
  disabled?: boolean
}

export function MarketBuy({ stock, handleBuy, disabled = false }: MarketBuyProps) {
  return (
    <GameList
      data={stock}
      emptyMessage="Obchodník nemá nic na prodej."
      renderItem={(item) => (
        <ActionRow onClick={() => handleBuy(item)} disabled={disabled}>
          <HStack align="center" gap="sm">
            <GameIcon icon={item.icon} color="gold" size="sm" />
            <Label color="gold">{item.name}</Label>
          </HStack>
          <Span font="mono" color="gold">
            {item.price}g
          </Span>
        </ActionRow>
      )}
    />
  )
}
