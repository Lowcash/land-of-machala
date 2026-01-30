'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { buyItemAction, purchaseServiceAction, sellItemAction } from '@/lib/actions/shop'
import { MARKET_CONSTANTS } from '@/lib/game/constants/values'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

import type { MarketItem } from '@/components/features/Game/Locations/Market/types'

interface UseMarketActionsProps {
  gold: number
}

export function useMarketActions({ gold }: UseMarketActionsProps) {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const [mode, setMode] = useState<'default' | 'buy' | 'sell' | 'blackmarket'>('default')
  const [bribed, setBribed] = useState(false)

  const enterBlackMarket = (isNight: boolean = false) => {
    if (isNight || bribed) {
      setMode('blackmarket')
    } else {
      if (gold >= MARKET_CONSTANTS.ENTRANCE_FEE) {
        toast('Strážce chce 50g za vstup do uličky.', {
          action: {
            label: 'Zaplatit',
            onClick: () => {
              execute(async () => {
                const result = await purchaseServiceAction({
                  serviceId: 'bribe',
                })
                if (result[0]?.success) {
                  setBribed(true)
                  setMode('blackmarket')
                  toast.success(result[0].message)
                }
                return result
              })
            },
          },
        })
      } else {
        toast.error('Je zavřeno a na úplatek nemáš.')
      }
    }
  }

  const handleBuy = (item: MarketItem) => {
    const price = item.price
    if (gold < price) {
      toast.error('Nedostatek zlata')
      return
    }

    execute(() =>
      buyItemAction({
        itemName: item.name,
        price,
        shopType: mode === 'blackmarket' ? 'black_market' : 'market',
      })
    )
  }

  const handleSell = (item: MarketItem) => {
    // Sell for 50% of base price
    const price = Math.floor(item.price * 0.5)

    execute(() =>
      sellItemAction({
        inventoryItemId: item.id.toString(),
        price,
      })
    )
  }

  return {
    mode,
    setMode,
    isPending,
    enterBlackMarket,
    handleBuy,
    handleSell,
  }
}
