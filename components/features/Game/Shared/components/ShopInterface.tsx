import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ActionRow, GameIcon } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, Label, MutedText, Span } from '@/components/ui/typography'

import type { TradeableItem } from './types'

export type ShopItem = TradeableItem

export interface ShopInterfaceProps {
  items: ShopItem[]
  gold: number
  onBuy: (item: ShopItem) => void
}

export function ShopInterface({ gold, items, onBuy }: ShopInterfaceProps) {
  const handleBuy = (item: ShopItem) => {
    if (gold < item.price) {
      toast.error('Nemáš dost zlata!')
      return
    }
    onBuy(item)
  }

  return (
    <VStack gap="sm" fullWidth>
      {items.length === 0 ? (
        <VStack py="md" align="center" fullWidth>
          <MutedText italic>Obchodník momentálně nic nenabízí.</MutedText>
        </VStack>
      ) : (
        <VStack gap="sm" fullWidth>
          {items.map((item) => {
            return (
              <ActionRow key={item.id || item.name} interactive={false}>
                <HStack align="center" gap="md" fullWidth>
                  <GameIcon icon={item.icon} color="gold" size="md" />
                  <VStack gap="none" flex="1">
                    <Label color="gold">{item.name}</Label>
                    {item.description && <Caption color="muted">{item.description}</Caption>}
                  </VStack>

                  <HStack pl="sm" border="game-l" align="center" gap="md">
                    <Span color="gold" bold>
                      {item.price}g
                    </Span>
                    <Button
                      variant="secondary_game"
                      size="sm"
                      onClick={() => handleBuy(item)}
                      disabled={gold < item.price}
                      label="Koupit"
                    />
                  </HStack>
                </HStack>
              </ActionRow>
            )
          })}
        </VStack>
      )}
    </VStack>
  )
}
