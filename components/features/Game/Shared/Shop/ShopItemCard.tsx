import { Coins, HelpCircle } from 'lucide-react'

import type { ShopItem } from '@/lib/types/shop'

import { Card } from '@/components/ui/card'
import { GameIcon, StatBadge } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { H3, P } from '@/components/ui/typography'

import { ShopBuyButton } from './ShopBuyButton'

interface ShopItemCardProps {
  item: ShopItem
  gold: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buyAction: () => Promise<any>
  disabled?: boolean
}

export function ShopItemCard({ item, gold, buyAction, disabled }: ShopItemCardProps) {
  const canAfford = gold >= item.price

  return (
    <VStack interactive={!disabled} opacity={disabled ? '50' : '100'} fullHeight>
      <Card variant="muted" fullHeight>
        <Card.Content>
          <VStack gap="md" fullHeight>
            <HStack align="start" justify="between" gap="sm">
              <GameIcon icon={item.icon || HelpCircle} size="lg" color="gold" bgOpacity="20" />
              <StatBadge label={item.price} icon={Coins} color="gold" variant="subtle" />
            </HStack>

            <VStack gap="xs" flex="1">
              <H3 color={canAfford ? 'gold' : 'muted'} truncate>
                {item.name}
              </H3>
              <P color="muted" size="sm" _internalClassName="line-clamp-3">
                {item.description}
              </P>
            </VStack>

            <VStack mt="md" fullWidth>
              <ShopBuyButton
                price={item.price}
                canAfford={canAfford}
                action={buyAction}
                fullWidth
              />
            </VStack>
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
