import { Skull } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { Label } from '@/components/ui/typography'

import type { MarketItem } from './types'

interface BlackMarketProps {
  stock: MarketItem[]
  handleBuy: (item: MarketItem) => void
  disabled?: boolean
}

export function BlackMarket({ stock, handleBuy, disabled = false }: BlackMarketProps) {
  return (
    <VStack opacity={disabled ? '50' : '100'} fullWidth>
      <Card border="magic" bg="black-60">
        <Card.Content p="sm">
          <HStack justify="center" align="center" gap="sm" mb="sm">
            <Skull className="text-game-magic h-3 w-3" />
            <Label color="magic" uppercase bold font="fantasy" letterSpacing="wider">
              Nelegální zboží
            </Label>
            <Skull className="text-game-magic h-3 w-3" />
          </HStack>
          <VStack gap="xs">
            {stock.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleBuy(item)}
                variant="black_market"
                icon={item.icon}
                label={item.name}
                subLabelRight={`${item.price}g`}
                fullWidth
              />
            ))}
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
