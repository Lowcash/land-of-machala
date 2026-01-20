'use client'

import { ArrowLeft, EyeOff, Package, ShoppingBag, Skull, Store, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ActionBtn } from './ActionBtn'
import { ActionsLayout } from './ActionsLayout'
import { GamePanel } from './GameLayout'
// Import new sub-components and types
import { BlackMarket } from './Market/MarketBlackMarket'
import { MarketBuy } from './Market/MarketBuy'
import { MarketSell } from './Market/MarketSell'
import type { MarketActionsProps, MarketItem } from './Market/types'
import { useHaggle } from './Market/useHaggle'

export function MarketActions({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: MarketActionsProps) {
  const [mode, setMode] = useState<'default' | 'buy' | 'sell' | 'blackmarket'>('default')
  const [stock, setStock] = useState<MarketItem[]>([])
  const [blackMarketStock, setBlackMarketStock] = useState<MarketItem[]>([])
  const [isNight, setIsNight] = useState(false)
  const [bribed, setBribed] = useState(false)

  const showMessage = (msg: string) => {
    toast.success(msg)
  }

  // Use the custom hook for haggle logic
  const { haggledItems, handleHaggle, getPrice } = useHaggle({
    setInfoText,
    showMessage,
  })

  // Set isNight only on client side to avoid hydration error
  useEffect(() => {
    setIsNight(Math.random() > 0.5)
  }, [])

  useEffect(() => {
    // Generate daily stock
    const generateStock = (): MarketItem[] => [
      {
        id: 101,
        name: 'Lektvar zdraví',
        type: 'consumable',
        icon: Package,
        price: 30,
        healing: 30,
      },
      { id: 102, name: 'Lektvar many', type: 'consumable', icon: Package, price: 40, mana: 30 },
      { id: 103, name: 'Kus železa', type: 'consumable', icon: Package, price: 15 },
      { id: 104, name: 'Dubové dřevo', type: 'consumable', icon: Package, price: 10 },
      { id: 105, name: 'Cestovní chléb', type: 'consumable', icon: Package, price: 5, healing: 5 },
    ]

    const generateBlackStock = (): MarketItem[] => [
      { id: 201, name: 'Jed zmije', type: 'consumable', icon: Skull, price: 150 },
      { id: 202, name: 'Kradený prsten', type: 'consumable', icon: EyeOff, price: 80 },
      { id: 203, name: 'Temný elixír', type: 'consumable', icon: Skull, price: 200 },
    ]

    setStock(generateStock())
    setBlackMarketStock(generateBlackStock())
  }, [])

  const handleBuy = (item: MarketItem) => {
    const finalPrice = getPrice(item, true)
    if (gold < finalPrice) {
      toast.error('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - finalPrice)

    // Create a new instance
    const newItem: MarketItem = {
      ...item,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
    }

    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${item.name} za ${finalPrice}g.`)
    showMessage(`Koupeno: ${item.name}`)
  }

  const handleSell = (item: MarketItem) => {
    const finalPrice = getPrice(item, false)
    setGold((g) => g + finalPrice)
    setInventory((prev) => prev.filter((i) => i.id !== item.id))
    setInfoText(`Prodals ${item.name} za ${finalPrice} zlaťáků.`)
    showMessage(`Prodáno: ${item.name} (+${finalPrice}g)`)
  }

  const enterBlackMarket = () => {
    if (isNight || bribed) {
      setMode('blackmarket')
      setInfoText('Vstoupil jsi do stinné uličky. Obchodníci zde šeptají a zboží má podivný původ.')
    } else {
      if (gold >= 50) {
        if (
          confirm(
            "Strážný u brány tě nechce pustit. 'V noci je tu zavřeno,' bručí. Podplatit ho (50g)?"
          )
        ) {
          setGold((g) => g - 50)
          setBribed(true)
          setMode('blackmarket')
          setInfoText('Strážný shrábl měšec a poodstoupil. Cesta do podsvětí je volná.')
        }
      } else {
        toast.error('Je zavřeno a nemáš na úplatek.')
      }
    }
  }

  const renderContent = () => {
    if (mode === 'default') {
      return (
        <div className="space-y-2">
          <ActionBtn onClick={() => setMode('buy')} icon={Store}>
            Prohlédnout <span className="text-[#ffd700]">zboží</span>
          </ActionBtn>
          <ActionBtn onClick={() => setMode('sell')} icon={ShoppingBag}>
            Prodat <span className="text-[#69ccf0]">předměty</span>
          </ActionBtn>
          <ActionBtn
            onClick={() => showMessage('Obchodníci si jen špitají o počasí.')}
            icon={Users}
          >
            Mluvit s <span className="text-[#ffd700]">obchodníky</span>
          </ActionBtn>
          <ActionBtn
            onClick={enterBlackMarket}
            icon={EyeOff}
            className={isNight || bribed ? 'border-[#b66bd4] bg-[#b66bd4]/10' : 'opacity-70'}
          >
            <span className="flex w-full items-center justify-between">
              <span>
                Hledat <span className="text-[#b66bd4]">Černý trh</span>
              </span>
              {isNight ? (
                <span className="rounded bg-[#b66bd4] px-1 text-[10px] text-black">NOC</span>
              ) : (
                <span className="text-[10px] text-[#8b7355]">DEN</span>
              )}
            </span>
          </ActionBtn>
        </div>
      )
    }

    if (mode === 'buy') {
      return (
        <MarketBuy
          stock={stock}
          handleBuy={handleBuy}
          handleHaggle={handleHaggle}
          getPrice={getPrice}
          haggledItems={haggledItems}
        />
      )
    }

    if (mode === 'sell') {
      return (
        <MarketSell
          inventory={inventory}
          handleSell={handleSell}
          handleHaggle={handleHaggle}
          getPrice={getPrice}
          haggledItems={haggledItems}
        />
      )
    }

    if (mode === 'blackmarket') {
      return <BlackMarket stock={blackMarketStock} handleBuy={handleBuy} />
    }
    return null
  }

  return (
    <div className="space-y-4">
      {mode === 'default' ? (
        <ActionsLayout
          title="Tržiště"
          onBack={onBack}
          showDirections={false}
          onToggleDirections={() => {}}
          exploration={
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-3 text-[#ffd700]">
                <span className="text-xs tracking-wider text-[#8b7355] uppercase">Tvé zlato:</span>
                <span className="font-bold">{gold}g</span>
              </div>
              <div className="rounded border border-[#8b6f47] bg-black/60 p-3 text-xs leading-relaxed text-[#8b7355]">
                Křik trhovců se mísí s bečením ovcí a cinkáním mincí. Vůně čerstvého pečiva bojuje
                se zápachem ryb. Tržiště nikdy nespí... tedy, kromě noci, kdy se mění v něco jiného.
              </div>
            </div>
          }
        >
          <div className="space-y-2">
            <ActionBtn onClick={() => setMode('buy')} icon={Store}>
              Prohlédnout <span className="text-[#ffd700]">zboží</span>
            </ActionBtn>
            <ActionBtn onClick={() => setMode('sell')} icon={ShoppingBag}>
              Prodat <span className="text-[#69ccf0]">předměty</span>
            </ActionBtn>
            <ActionBtn
              onClick={() => showMessage('Obchodníci si jen špitají o počasí.')}
              icon={Users}
            >
              Mluvit s <span className="text-[#ffd700]">obchodníky</span>
            </ActionBtn>
            <ActionBtn
              onClick={enterBlackMarket}
              icon={EyeOff}
              className={isNight || bribed ? 'border-[#b66bd4] bg-[#b66bd4]/10' : 'opacity-70'}
            >
              <span className="flex w-full items-center justify-between">
                <span>
                  Hledat <span className="text-[#b66bd4]">Černý trh</span>
                </span>
                {isNight ? (
                  <span className="rounded bg-[#b66bd4] px-1 text-[10px] text-black">NOC</span>
                ) : (
                  <span className="text-[10px] text-[#8b7355]">DEN</span>
                )}
              </span>
            </ActionBtn>
          </div>
        </ActionsLayout>
      ) : (
        <GamePanel title={mode === 'buy' ? 'NÁKUP' : mode === 'sell' ? 'PRODEJ' : 'ČERNÝ TRH'}>
          <button
            onClick={() => setMode('default')}
            className="mb-4 flex items-center gap-2 text-sm text-[#8b7355] transition-colors hover:text-[#d4a574]"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na náměstí
          </button>
          {renderContent()}
        </GamePanel>
      )}
    </div>
  )
}
