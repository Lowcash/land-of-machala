'use client'

import type { LucideIcon } from 'lucide-react'
import {
    ArrowLeft,
    ArrowRight,
    Coins,
    EyeOff,
    Home,
    MessageSquare,
    Package,
    ShoppingBag,
    Skull,
    Store,
    ThumbsDown,
    ThumbsUp,
    Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GamePanel } from './GameLayout'

type ItemType = 'weapon' | 'armor' | 'consumable'

interface Item {
  id: number
  name: string
  type: ItemType
  icon: LucideIcon
  price?: number
  attack?: number
  defense?: number
  durability?: number
  maxDurability?: number
  level?: number
  equipped?: boolean
  healing?: number
  mana?: number
}

interface MarketActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: Item[]
  setInventory: (val: Item[] | ((prev: Item[]) => Item[])) => void
  setInfoText: (text: string) => void
}

interface HaggleState {
  price: number
  success: boolean
  attempted: boolean
}

export function MarketActions({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: MarketActionsProps) {
  const [mode, setMode] = useState<'default' | 'buy' | 'sell' | 'blackmarket'>('default')
  const [stock, setStock] = useState<Item[]>([])
  const [blackMarketStock, setBlackMarketStock] = useState<Item[]>([])
  const [isNight, setIsNight] = useState(false)
  const [bribed, setBribed] = useState(false)
  const [message, setMessage] = useState('')

  // Track haggling per item ID
  const [haggledItems, setHaggledItems] = useState<Record<number, HaggleState>>({})

  // Set isNight only on client side to avoid hydration error
  useEffect(() => {
    setIsNight(Math.random() > 0.5)
  }, [])
  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  useEffect(() => {
    // Generate daily stock
    const generateStock = (): Item[] => [
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

    const generateBlackStock = (): Item[] => [
      { id: 201, name: 'Jed zmije', type: 'consumable', icon: Skull, price: 150 },
      { id: 202, name: 'Kradený prsten', type: 'consumable', icon: EyeOff, price: 80 },
      { id: 203, name: 'Temný elixír', type: 'consumable', icon: Skull, price: 200 },
    ]

    setStock(generateStock())
    setBlackMarketStock(generateBlackStock())
  }, [])

  const getPrice = (item: Item, buying: boolean) => {
    const basePrice = buying ? item.price || 0 : Math.floor((item.price || 10) * 0.5)
    const haggle = haggledItems[item.id]
    if (haggle) return haggle.price
    return basePrice
  }

  const handleHaggle = (item: Item, buying: boolean, e: React.MouseEvent) => {
    e.stopPropagation()

    if (haggledItems[item.id]) return

    // Base chance 40% + random factor.
    const roll = Math.random()
    const success = roll > 0.4

    const currentPrice = getPrice(item, buying)
    let newPrice = currentPrice

    if (success) {
      // Buying: Lower price. Selling: Higher price.
      const factor = buying ? 0.8 : 1.2
      newPrice = Math.floor(currentPrice * factor)
      setInfoText(buying ? 'Uspěls! Cena šla dolů.' : 'Skvělé! Zaplatí víc.')
      showMessage('Úspěšné smlouvání!')
    } else {
      // Buying: Higher price (annoyed). Selling: Lower price (lowball).
      const factor = buying ? 1.15 : 0.85
      newPrice = Math.floor(currentPrice * factor)
      setInfoText("Obchodník se naštval. 'Tohle je moje poslední nabídka!'")
      showMessage('Neúspěch!')
    }

    setHaggledItems((prev) => ({
      ...prev,
      [item.id]: { price: newPrice, success, attempted: true },
    }))
  }

  const handleBuy = (item: Item) => {
    const finalPrice = getPrice(item, true)
    if (gold < finalPrice) {
      showMessage('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - finalPrice)

    // Create a new instance
    const newItem = {
      ...item,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
    }

    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${item.name} za ${finalPrice}g.`)
    showMessage(`Koupeno: ${item.name}`)
  }

  const handleSell = (item: Item) => {
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
        showMessage('Je zavřeno a nemáš na úplatek.')
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
              <div className="scrollbar-custom max-h-75 space-y-2 overflow-y-auto">
                {stock.map((item) => {
                  const price = getPrice(item, true)
                  const haggleState = haggledItems[item.id]

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleBuy(item)}
                      className="group relative w-full cursor-pointer rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {!haggleState && (
                            <button
                              onClick={(e) => handleHaggle(item, true, e)}
                              className="rounded p-1 text-[#d4a574] transition-colors hover:bg-[#ffd700]/20 hover:text-[#ffd700]"
                              title="Smlouvat"
                            >
                              <MessageSquare className="h-3 w-3" />
                            </button>
                          )}
                          <span
                            className={`font-mono text-xs ${haggleState ? (haggleState.success ? 'text-green-400' : 'text-red-400') : 'text-[#ffd700]'}`}
                          >
                            {price}g
                          </span>
                        </div>
                      </div>
                      {haggleState && (
                        <div className="absolute top-1 right-16">
                          {haggleState.success ? (
                            <ThumbsUp className="h-3 w-3 text-green-500/50" />
                          ) : (
                            <ThumbsDown className="h-3 w-3 text-red-500/50" />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
        )
    }

    if (mode === 'sell') {
        return (
              <div className="scrollbar-custom max-h-75 space-y-2 overflow-y-auto">
                {inventory.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#8b7355]">
                    Tvůj batoh je prázdný.
                  </div>
                ) : (
                  inventory.map((item) => {
                    const price = getPrice(item, false)
                    const haggleState = haggledItems[item.id]

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSell(item)}
                        className="group relative w-full cursor-pointer rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#69ccf0]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <item.icon className="h-5 w-5 text-[#8b7355]" />
                              {item.equipped && (
                                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#6fbf6f]"></div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm text-[#f5e6d3]">{item.name}</div>
                              <div className="text-[10px] text-[#8b7355]">{item.type}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!haggleState && (
                              <button
                                onClick={(e) => handleHaggle(item, false, e)}
                                className="rounded p-1 text-[#8b7355] transition-colors hover:bg-[#69ccf0]/20 hover:text-[#69ccf0]"
                                title="Smlouvat o ceně"
                              >
                                <MessageSquare className="h-3 w-3" />
                              </button>
                            )}
                            <div
                              className={`flex items-center gap-1 font-mono text-xs ${haggleState ? (haggleState.success ? 'text-green-400' : 'text-red-400') : 'text-[#69ccf0]'}`}
                            >
                              <ArrowRight className="h-3 w-3" />
                              {price}g
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
        )
    }

    if (mode === 'blackmarket') {
        return (
              <div className="space-y-2 rounded border border-[#b66bd4]/30 bg-[#0a050a] p-2">
                <div className="mb-2 flex items-center justify-center gap-2 text-center text-xs font-bold tracking-wider text-[#b66bd4] uppercase">
                  <Skull className="h-3 w-3" />
                  Nelegální zboží
                  <Skull className="h-3 w-3" />
                </div>
                {blackMarketStock.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleBuy(item)}
                    className="group w-full rounded border border-[#b66bd4]/30 bg-black/80 p-2 text-left transition-all hover:border-[#b66bd4]"
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold text-[#dcd0ff] group-hover:text-[#b66bd4]">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </span>
                      <span className="text-xs text-[#b66bd4]">{item.price}g</span>
                    </div>
                  </button>
                ))}
              </div>
        )
    }
    return null
  }

  const subsections = [
    {
        title: 'TRŽNICE',
        content: renderContent(),
        defaultOpen: true
    },
    {
        title: 'ATMOSFÉRA',
        content: (
            <div className="rounded border border-[#8b6f47] bg-black/60 p-3 text-xs leading-relaxed text-[#8b7355]">
              {mode === 'blackmarket' ? (
                <span className="text-[#b66bd4]">
                  Vzduch je zde těžký a páchne po levném koření a strachu. Postavy v kápích si tě měří
                  nedůvěřivým pohledem. Zde seženěš to, co je jinde zakázané.
                </span>
              ) : (
                'Křik trhovců se mísí s bečením ovcí a cinkáním mincí. Vůně čerstvého pečiva bojuje se zápachem ryb. Tržiště nikdy nespí... tedy, kromě noci, kdy se mění v něco jiného.'
              )}
            </div>
        ),
        defaultOpen: true
    }
  ]

  const getTitle = () => {
    switch (mode) {
        case 'default': return 'Tržiště'
        case 'buy': return 'Nákup zboží'
        case 'sell': return 'Prodej'
        case 'blackmarket': return 'Černý trh'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
           <ActionBtn
              onClick={mode === 'default' ? onBack : () => setMode('default')}
              icon={mode === 'default' ? Home : ArrowLeft}
              small
              className="w-auto"
            >
              <span>{mode === 'default' ? 'Vrátit se do města' : 'Zpět na náměstí'}</span>
            </ActionBtn>
            
            <div className="flex items-center gap-2 px-3 font-mono text-[#ffd700]">
              <Coins className="h-4 w-4" />
              {gold}
            </div>
      </div>

      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}

      <GamePanel title={getTitle()} subsections={subsections} />
    </div>
  )
}
