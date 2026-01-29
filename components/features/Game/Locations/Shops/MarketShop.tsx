'use client'

import { useState } from 'react'

import { ChevronLeft, EyeOff, ShoppingBag, Store } from 'lucide-react'
import { toast } from 'sonner'

import { BLACK_MARKET_STOCK, MARKET_STOCK } from '@/lib/game/constants/items'
import { MARKET_CONSTANTS } from '@/lib/game/constants/values'
import { useHaggle } from '@/lib/hooks/game/useHaggle'

import { Button } from '@/components/ui/button'

import { LocationLayout } from '../../Shared/components/LocationLayout'
import { BlackMarket } from '../Market/MarketBlackMarket'
import { MarketBuy } from '../Market/MarketBuy'
import { MarketSell } from '../Market/MarketSell'
import type { MarketItem } from '../Market/types'

interface MarketShopProps {
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
  setInfoText: (text: string | null) => void
}

export function MarketShop({
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: MarketShopProps) {
  const [mode, setMode] = useState<'default' | 'buy' | 'sell' | 'blackmarket'>('default')
  // Initialize with constants directly
  const [stock] = useState<MarketItem[]>([...MARKET_STOCK])
  const [blackMarketStock] = useState<MarketItem[]>([...BLACK_MARKET_STOCK])
  const [isNight] = useState(false) // Simplified for now
  const [bribed, setBribed] = useState(false)

  const { haggledItems, handleHaggle, getPrice } = useHaggle({
    setInfoText: (text: string) => setInfoText(text),
    showMessage: (msg) => toast.success(msg),
  })

  const enterBlackMarket = () => {
    if (isNight || bribed) {
      setMode('blackmarket')
    } else {
      if (gold >= MARKET_CONSTANTS.ENTRANCE_FEE) {
        toast('Strážce chce 50g za vstup do uličky.', {
          action: {
            label: 'Zaplatit',
            onClick: () => {
              setGold((g) => g - MARKET_CONSTANTS.ENTRANCE_FEE)
              setBribed(true)
              setMode('blackmarket')
            },
          },
        })
      } else {
        toast.error('Je zavřeno a na úplatek nemáš.')
      }
    }
  }

  const handleBuy = (item: MarketItem) => {
    const finalPrice = getPrice(item, true)
    if (gold < finalPrice) return toast.error('Nedostatek zlata')
    setGold((g) => g - finalPrice)
    setInventory((prev) => [...prev, { ...item, id: Math.random() }])
  }

  const handleSell = (item: MarketItem) => {
    const finalPrice = getPrice(item, false)
    setGold((g) => g + finalPrice)
    setInventory((prev) => prev.filter((i) => i.id !== item.id))
  }

  if (mode === 'buy') {
    return (
      <div className="space-y-3">
        <Button
          variant="link"
          onClick={() => setMode('default')}
          className="mb-2 h-auto p-0 text-[10px] text-[#8b7355]"
        >
          <ChevronLeft className="mr-1 h-3 w-3" /> Zpět na trh
        </Button>
        <MarketBuy
          stock={stock}
          handleBuy={handleBuy}
          handleHaggle={handleHaggle}
          getPrice={getPrice}
          haggledItems={haggledItems}
        />
      </div>
    )
  }

  if (mode === 'sell') {
    return (
      <div className="space-y-3">
        <Button
          variant="link"
          onClick={() => setMode('default')}
          className="mb-2 h-auto p-0 text-[10px] text-[#8b7355]"
        >
          <ChevronLeft className="mr-1 h-3 w-3" /> Zpět na trh
        </Button>
        <MarketSell
          inventory={inventory}
          handleSell={handleSell}
          handleHaggle={handleHaggle}
          getPrice={getPrice}
          haggledItems={haggledItems}
        />
      </div>
    )
  }

  if (mode === 'blackmarket') {
    return (
      <div className="space-y-3">
        <Button
          variant="link"
          onClick={() => setMode('default')}
          className="mb-2 h-auto p-0 text-[10px] text-purple-400"
        >
          <ChevronLeft className="mr-1 h-3 w-3" /> Zpět na trh
        </Button>
        <div className="mb-2 rounded border border-purple-900/30 bg-purple-900/10 p-3">
          <h4 className="text-xs font-bold tracking-wider text-purple-400 uppercase">Černý trh</h4>
        </div>
        <BlackMarket stock={blackMarketStock} handleBuy={handleBuy} />
      </div>
    )
  }

  return (
    <LocationLayout
      title="Tržiště svobodného města"
      description="Halas obchodníků, vůně koření a stovky lidí proudících mezi stánky."
    >
      <div className="grid grid-cols-1 gap-2">
        <Button
          variant="game-secondary"
          onClick={() => setMode('buy')}
          className="h-14 justify-start gap-4 px-4"
        >
          <Store className="h-5 w-5 text-[#ffd700]" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold">Koupit zboží</span>
            <span className="text-[10px] opacity-70">Lektvary, suroviny, základní vybavení</span>
          </div>
        </Button>
        <Button
          variant="game-secondary"
          onClick={() => setMode('sell')}
          className="h-14 justify-start gap-4 px-4"
        >
          <ShoppingBag className="h-5 w-5 text-[#ffd700]" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold">Prodat předměty</span>
            <span className="text-[10px] opacity-70">Zpeněžit kořist z výprav</span>
          </div>
        </Button>
        <Button
          variant="game-secondary"
          onClick={enterBlackMarket}
          className="h-14 justify-start gap-4 border-purple-900/20 px-4 hover:border-purple-900/50"
        >
          <EyeOff className="h-5 w-5 text-purple-500" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-purple-300">Podezřelá ulička</span>
            <span className="text-[10px] opacity-70">Vzácné a zakázané zboží</span>
          </div>
        </Button>
      </div>
    </LocationLayout>
  )
}
