'use client'

import { useState } from 'react'

import { ChevronLeft } from 'lucide-react'

import { MARKET_HUB_ACTIONS } from '@/lib/game/constants/interactive'
import { BLACK_MARKET_STOCK, MARKET_STOCK } from '@/lib/game/constants/items'
import { useMarketActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'

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
  const BackButton = ({ label = 'Zpět na trh', colorClass = 'text-[#8b7355]' }) => (
    <Button
      variant="link"
      onClick={() => setMode('default')}
      className={`mb-2 h-auto p-0 text-[10px] ${colorClass}`}
    >
      <ChevronLeft className="mr-1 h-3 w-3" /> {label}
    </Button>
  )

  if (mode === 'buy') {
    return (
      <div className="space-y-3">
        <BackButton />
        <MarketBuy stock={stock} handleBuy={handleBuy} disabled={isPending} />
      </div>
    )
  }

  if (mode === 'sell') {
    return (
      <div className="space-y-3">
        <BackButton />
        <MarketSell inventory={inventory} handleSell={handleSell} disabled={isPending} />
      </div>
    )
  }

  if (mode === 'blackmarket') {
    return (
      <div className="space-y-3">
        <BackButton label="Zpět na trh" colorClass="text-purple-400" />
        <div className="mb-2 rounded border border-purple-900/30 bg-purple-900/10 p-3">
          <h4 className="text-xs font-bold tracking-wider text-purple-400 uppercase">Černý trh</h4>
        </div>
        <BlackMarket stock={blackMarketStock} handleBuy={handleBuy} disabled={isPending} />
      </div>
    )
  }

  return (
    <LocationLayout
      title="Tržiště svobodného města"
      description="Halas obchodníků, vůně koření a stovky lidí proudících mezi stánky."
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {MARKET_HUB_ACTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant={action.id === 'blackmarket' ? 'compact' : 'large'}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={() => handleAction(action.actionId)}
            className={
              action.id === 'blackmarket' ? 'border-purple-900/20 hover:border-purple-900/50' : ''
            }
          />
        ))}
      </div>
    </LocationLayout>
  )
}
