'use client'

import { useState } from 'react'

import { ChevronLeft } from 'lucide-react'

import { MARKET_HUB_ACTIONS } from '@/lib/game/constants/interactive'
import { BLACK_MARKET_STOCK, MARKET_STOCK } from '@/lib/game/constants/items'
import { useMarketActions } from '@/lib/hooks/game'

import { ActionGrid } from '@/components/ui/action'
import { Button } from '@/components/ui/button'
import { VStack } from '@/components/ui/stack'
import { H4 } from '@/components/ui/typography'

import { LocationAction } from '../../Shared/components/LocationAction'
import { LocationLayout } from '../../Shared/components/LocationLayout'
import { BlackMarket } from '../Market/MarketBlackMarket'
import { MarketBuy } from '../Market/MarketBuy'
import { MarketSell } from '../Market/MarketSell'
import type { MarketItem } from '../Market/types'

interface MarketShopProps {
  gold: number
  inventory: MarketItem[]
}

export function MarketShop({ gold, inventory }: MarketShopProps) {
  // 1. Hooks
  const { mode, setMode, isPending, enterBlackMarket, handleBuy, handleSell } = useMarketActions({
    gold,
  })

  // 2. Navigation State
  const [stock] = useState<MarketItem[]>([...MARKET_STOCK])
  const [blackMarketStock] = useState<MarketItem[]>([...BLACK_MARKET_STOCK])

  // 3. Handlers
  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'enter_blackmarket':
        enterBlackMarket()
        break
      case 'set_mode_buy':
        setMode('buy')
        break
      case 'set_mode_sell':
        setMode('sell')
        break
      default:
        break
    }
  }

  // 4. Sub-components (Render helpers)
  const BackButton = ({ label = 'Zpět na trh' }) => (
    <Button
      variant="link_game"
      onClick={() => setMode('default')}
      label={label}
      icon={ChevronLeft}
    />
  )

  if (mode === 'buy') {
    return (
      <VStack gap="sm">
        <BackButton />
        <MarketBuy stock={stock} handleBuy={handleBuy} disabled={isPending} />
      </VStack>
    )
  }

  if (mode === 'sell') {
    return (
      <VStack gap="sm">
        <BackButton />
        <MarketSell inventory={inventory} handleSell={handleSell} disabled={isPending} />
      </VStack>
    )
  }

  if (mode === 'blackmarket') {
    return (
      <VStack gap="sm">
        <BackButton label="Zpět na trh" />
        <VStack p="sm" border="magic" bg="magic" opacity="10" rounded="sm">
          <H4 color="magic" bold>
            {'Černý trh'.toUpperCase()}
          </H4>
        </VStack>
        <BlackMarket stock={blackMarketStock} handleBuy={handleBuy} disabled={isPending} />
      </VStack>
    )
  }

  return (
    <LocationLayout
      title="Tržiště svobodného města"
      description="Halas obchodníků, vůně koření a stovky lidí proudících mezi stánky."
    >
      <ActionGrid columns={{ default: 1, sm: 2 }}>
        {MARKET_HUB_ACTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant={action.id === 'blackmarket' ? 'compact' : 'large'}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={() => handleAction(action.actionId)}
          />
        ))}
      </ActionGrid>
    </LocationLayout>
  )
}
