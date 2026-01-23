'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, EyeOff, ShoppingBag, Store } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BlackMarket } from '../Market/MarketBlackMarket'
import { MarketBuy } from '../Market/MarketBuy'
import { MarketSell } from '../Market/MarketSell'
import type { MarketItem } from '../Market/types'
import { useHaggle } from '../Market/useHaggle'

// Note: Market is complex and has sub-modes, so it wraps specific sub-components
// rather than fitting entirely into ShopInterface, but uses the same layout primitives.

interface MarketShopProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
  setInfoText: (text: string) => void
}

export function MarketShop({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: MarketShopProps) {
  const [mode, setMode] = useState<'default' | 'buy' | 'sell' | 'blackmarket'>('default')
  const [stock, setStock] = useState<MarketItem[]>([])
  const [blackMarketStock, setBlackMarketStock] = useState<MarketItem[]>([])
  const [isNight, setIsNight] = useState(false)
  const [bribed, setBribed] = useState(false)

  // Haggle hook
  const { haggledItems, handleHaggle, getPrice } = useHaggle({
    setInfoText,
    showMessage: (msg) => toast.success(msg),
  })

  useEffect(() => {
    setIsNight(Math.random() > 0.5)

    // Simple mock stock generation
    // In a real app this would probably come from props or API
    setStock([
      { id: 101, name: 'Lektvar zdraví', type: 'consumable', price: 30, healing: 30 },
      { id: 102, name: 'Lektvar many', type: 'consumable', price: 40, mana: 30 },
      { id: 103, name: 'Kus železa', type: 'consumable', price: 15 },
    ] as any)

    setBlackMarketStock([
      { id: 201, name: 'Jed zmije', type: 'consumable', price: 150 },
      { id: 202, name: 'Kradený prsten', type: 'consumable', price: 80 },
    ] as any)
  }, [])

  const enterBlackMarket = () => {
    if (isNight || bribed) {
      setMode('blackmarket')
      setInfoText('Vstoupil jsi do stinné uličky.')
    } else {
      if (gold >= 50) {
        if (confirm('Strážný chce úplatek 50g. Zaplatit?')) {
          setGold((g) => g - 50)
          setBribed(true)
          setMode('blackmarket')
          setInfoText('Uplacen.')
        }
      } else {
        toast.error('Je zavřeno a nemáš na úplatek.')
      }
    }
  }

  const handleBuy = (item: MarketItem) => {
    const finalPrice = getPrice(item, true)
    if (gold < finalPrice) return toast.error('Nedostatek zlata')

    setGold((g) => g - finalPrice)
    const newItem = { ...item, id: Math.random() }
    setInventory((prev) => [...prev, newItem])
    toast.success(`Koupeno: ${item.name}`)
  }

  const handleSell = (item: MarketItem) => {
    const finalPrice = getPrice(item, false)
    setGold((g) => g + finalPrice)
    setInventory((prev) => prev.filter((i) => i.id !== item.id))
    toast.success(`Prodáno: ${item.name}`)
  }

  // --- Render Modes ---

  if (mode === 'buy') {
    return (
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('default')}
            className="text-game-gold flex items-center gap-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět
          </button>
          <h3 className="font-medieval text-game-gold-muted scroll-m-20 text-2xl font-semibold tracking-tight">
            Nákup na trhu
          </h3>
        </div>
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
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('default')}
            className="text-game-gold flex items-center gap-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět
          </button>
          <h3 className="font-medieval text-game-gold-muted scroll-m-20 text-2xl font-semibold tracking-tight">
            Prodej předmětů
          </h3>
        </div>
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
      <div className="flex h-full flex-col gap-4 rounded-lg border border-purple-900 bg-black/40 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('default')}
            className="flex items-center gap-2 text-purple-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět do bezpečí
          </button>
          <h3 className="font-medieval scroll-m-20 text-2xl font-semibold tracking-tight text-purple-500">
            Černý Trh
          </h3>
        </div>
        <BlackMarket stock={blackMarketStock} handleBuy={handleBuy} />
      </div>
    )
  }

  // Default Dashboard Logic
  return (
    <div className="grid h-full gap-6 p-4 md:grid-cols-12">
      {/* Narrative Section */}
      <div className="flex flex-col gap-4 md:col-span-4">
        <h2 className="border-game-copper/20 font-medieval text-game-gold scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Centrální Tržiště
        </h2>
        <Card variant="muted" className="p-4 text-sm italic">
          "Křik trhovců se mísí s bečením ovcí. Vůně čerstvého pečiva bojuje se zápachem ryb.
          Tržiště nikdy nespí... tedy, kromě noci, kdy se mění v něco jiného."
        </Card>
        <div className="border-game-gold/30 bg-game-gold/10 text-game-gold flex items-center justify-between rounded border p-3">
          <span>Tvé zlato:</span>
          <span className="text-xl font-bold">{gold}g</span>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid auto-rows-min grid-cols-1 gap-4 md:col-span-8 md:grid-cols-2">
        <Button
          variant="game-primary"
          onClick={() => setMode('buy')}
          className="h-24 gap-2 text-lg"
        >
          <Store className="h-6 w-6" />
          <span>
            Prohlédnout <span className="text-game-gold">zboží</span>
          </span>
        </Button>
        <Button
          variant="game-primary"
          onClick={() => setMode('sell')}
          className="h-24 gap-2 text-lg"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>
            Prodat <span className="text-game-info">předměty</span>
          </span>
        </Button>

        <Button
          variant="game-primary"
          onClick={enterBlackMarket}
          className={`h-24 gap-2 md:col-span-2 ${isNight || bribed ? 'border-purple-500/50 text-purple-300' : 'opacity-70 grayscale'}`}
        >
          <div className="flex items-center gap-3">
            <EyeOff className="h-6 w-6" />
            <span className="flex flex-col items-start">
              <span className="text-lg">Podezřelá ulička</span>
              <span className="text-xs font-normal opacity-60">
                {isNight ? 'Je noc...' : 'Je den (Strážný hlídá)'}
              </span>
            </span>
          </div>
        </Button>
      </div>

      <div className="md:col-span-12">
        <Button variant="outline" onClick={onBack} className="w-full gap-2">
          <ArrowLeft className="h-4 w-4" />
          Zpět na náměstí
        </Button>
      </div>
    </div>
  )
}
