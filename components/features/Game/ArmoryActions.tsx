'use client'

import { Coins, Home, Shield, Store, Sword } from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

type ItemType = 'weapon' | 'armor' | 'consumable'

interface Item {
  id: number
  name: string
  type: ItemType
  icon: any
  price?: number
  attack?: number
  defense?: number
  durability?: number
  maxDurability?: number
  level?: number
  equipped?: boolean
  magic?: number
  speed?: number
  healing?: number
  mana?: number
  slot?: string
  strength?: number
  intelligence?: number
  agility?: number
  stamina?: number
}

interface ArmoryActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: Item[]
  setInventory: (val: Item[] | ((prev: Item[]) => Item[])) => void
  setInfoText: (text: string) => void
}

export function ArmoryActions({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: ArmoryActionsProps) {
  const [mode, setMode] = useState<'default' | 'buy' | 'sell'>('default')
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const stock = [
    { name: 'Dřevěný meč', attack: 5, price: 50, type: 'weapon', icon: Sword },
    { name: 'Železný meč', attack: 12, price: 150, type: 'weapon', icon: Sword },
    { name: 'Dlouhý meč', attack: 15, price: 200, type: 'weapon', icon: Sword },
    { name: 'Bojová sekera', attack: 18, price: 300, type: 'weapon', icon: Sword },
    { name: 'Kožená zbroj', defense: 8, price: 100, type: 'armor', icon: Shield },
    { name: 'Řetězová zbroj', defense: 15, price: 250, type: 'armor', icon: Shield },
    { name: 'Ocelová zbroj', defense: 20, price: 400, type: 'armor', icon: Shield },
    { name: 'Platová zbroj', defense: 25, price: 600, type: 'armor', icon: Shield },
  ]

  const handleBuy = (template: any) => {
    if (gold < template.price) {
      showMessage('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - template.price)
    const newItem = {
      ...template,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      durability: 100,
      maxDurability: 100,
      level: 0,
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${template.name}.`)
    showMessage(`Koupeno: ${template.name}`)
  }

  const handleSell = (item: Item) => {
    const price = Math.floor((item.price || 10) * 0.5)
    setGold((g) => g + price)
    setInventory((prev) => prev.filter((i) => i.id !== item.id))
    setInfoText(`Prodals ${item.name} za ${price} zlaťáků.`)
    showMessage(`Prodáno: ${item.name} (+${price}g)`)
  }

  return (
    <GameLayout>
      <GamePanel title={mode === 'default' ? 'Zbrojíř' : mode === 'buy' ? 'Nákup' : 'Prodej'}>
        <div className="space-y-1.5">
          <div className="mb-2 flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-2">
            <ActionBtn onClick={mode === 'default' ? onBack : () => setMode('default')} icon={Home}>
              <span>{mode === 'default' ? 'Vrátit se do města' : 'Zpět k výběru'}</span>
            </ActionBtn>
            <div className="flex items-center gap-2 px-3 font-mono text-[#ffd700]">
              <Coins className="h-4 w-4" />
              {gold}
            </div>
          </div>

          <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
            {mode === 'default' && (
              <>
                <ActionBtn onClick={() => setMode('buy')} icon={Store}>
                  Koupit <span className="text-[#ffd700]">zbraně a zbroje</span>
                </ActionBtn>
                <ActionBtn onClick={() => setMode('sell')} icon={Coins}>
                  Prodat <span className="text-[#69ccf0]">předměty</span>
                </ActionBtn>
              </>
            )}

            {mode === 'buy' && (
              <div className="scrollbar-custom max-h-[300px] space-y-2 overflow-y-auto">
                {stock.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBuy(item)}
                    className="group w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </span>
                      <span className="text-xs text-[#ffd700]">{item.price}g</span>
                    </div>
                    <div className="flex gap-2 text-[10px] text-[#8b7355]">
                      {item.attack && (
                        <span>
                          Útok: <span className="text-[#ff6b6b]">+{item.attack}</span>
                        </span>
                      )}
                      {item.defense && (
                        <span>
                          Obrana: <span className="text-[#69ccf0]">+{item.defense}</span>
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {mode === 'sell' && (
              <div className="scrollbar-custom max-h-[300px] space-y-2 overflow-y-auto">
                {inventory.filter((i) => i.type === 'weapon' || i.type === 'armor').length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#8b7355]">
                    Nemáš žádné vybavení k prodeji.
                  </div>
                ) : (
                  inventory
                    .filter((i) => i.type === 'weapon' || i.type === 'armor')
                    .map((item) => {
                      const price = Math.floor((item.price || 10) * 0.5)
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSell(item)}
                          className="group w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#69ccf0]"
                        >
                          <div className="mb-1 flex items-start justify-between">
                            <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#69ccf0]">
                              <item.icon className="h-4 w-4" />
                              {item.name}
                            </span>
                            <span className="text-xs text-[#69ccf0]">{price}g</span>
                          </div>
                          <div className="flex gap-2 text-[10px] text-[#8b7355]">
                            {item.attack && <span>Útok: +{item.attack}</span>}
                            {item.defense && <span>Obrana: +{item.defense}</span>}
                            {item.equipped && <span className="text-[#6fbf6f]">(Nasazeno)</span>}
                          </div>
                        </button>
                      )
                    })
                )}
              </div>
            )}
          </div>
        </div>
      </GamePanel>

      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}

      <GamePanel title="Zbrojíř">
        <div className="flex gap-3 rounded border border-[#8b6f47] bg-black/60 p-3 text-xs leading-relaxed text-[#8b7355]">
          <div className="flex h-[40px] min-w-[40px] items-center justify-center rounded-full border border-[#8b6f47] bg-[#8b6f47]/20">
            <Shield className="h-5 w-5 text-[#f5e6d3]" />
          </div>
          <div>
            {mode === 'default'
              ? '"Potřebuješ pořádnou ocel? Mám tu meče ostré jako břitva a zbroje, co vydrží úder draka."'
              : mode === 'buy'
                ? '"Vybírej pečlivě. Tvůj život může záviset na kvalitě tvé zbroje."'
                : '"Vykupuji jen kvalitní zboží. Žádný rezavý šrot."'}
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
