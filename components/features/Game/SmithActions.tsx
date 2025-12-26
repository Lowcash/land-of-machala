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

interface SmithActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: Item[]
  setInventory: (val: Item[] | ((prev: Item[]) => Item[])) => void
  setInfoText: (text: string) => void
}

export function SmithActions({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: SmithActionsProps) {
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | null>(null)
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // ARMORY SHOP STOCK (from design repo)
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

  return (
    <GameLayout>
      <GamePanel title="Akce">
        <div className="space-y-1.5">
          <ActionBtn onClick={onBack} icon={Home}>
            <span>Vrátit se do města</span>
          </ActionBtn>

          <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
            <ActionBtn
              onClick={() => setSelectedAction('buy')}
              icon={Store}
              className={selectedAction === 'buy' ? 'border-[#ffd700] bg-black/60' : ''}
            >
              <span className="flex w-full items-center justify-between">
                <span>Koupit zbraně a zbroje</span>
              </span>
            </ActionBtn>
            <ActionBtn
              onClick={() => setSelectedAction('sell')}
              icon={Coins}
              className={selectedAction === 'sell' ? 'border-[#ffd700] bg-black/60' : ''}
            >
              <span className="flex w-full items-center justify-between">
                <span>Prodat předměty</span>
              </span>
            </ActionBtn>
          </div>
        </div>
      </GamePanel>

      <GamePanel title="Zbrojíř">
        {!selectedAction ? (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji zbrojíři.
            </p>
          </div>
        ) : selectedAction === 'buy' ? (
          <div className="relative flex max-h-full flex-col overflow-hidden rounded border border-[#8b6f47] bg-black/60">
            <div className="scrollbar-custom overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="sticky top-0 z-10 bg-black/80">
                  <tr className="border-b border-[#8b6f47]">
                    <th
                      className="px-2 py-1.5 text-left text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Předmět
                    </th>
                    <th
                      className="px-2 py-1.5 text-center text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Bonus
                    </th>
                    <th
                      className="px-2 py-1.5 text-right text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Cena
                    </th>
                    <th
                      className="px-2 py-1.5 text-right text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Akce
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#8b6f47]/30 hover:bg-black/20">
                      <td className="px-2 py-2 text-[#f5e6d3]">{item.name}</td>
                      <td className="px-2 py-2 text-center">
                        {item.attack && <span className="text-[#ff6b6b]">+{item.attack}</span>}
                        {item.defense && <span className="text-[#69ccf0]">+{item.defense}</span>}
                      </td>
                      <td className="px-2 py-2 text-right text-[#ffd700]">{item.price}g</td>
                      <td className="px-2 py-2 text-right">
                        <button
                          onClick={() => handleBuy(item)}
                          className="rounded border border-[#ffd700] bg-gradient-to-r from-[#8b6f47] to-[#6d5a3e] px-2 py-1 text-xs text-white hover:from-[#a8865d] hover:to-[#a8865d]"
                        >
                          Koupit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji zbrojíři.
            </p>
          </div>
        )}
      </GamePanel>

      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}
    </GameLayout>
  )
}
