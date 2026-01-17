'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import { Coins, Home, Store } from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

import type { LucideIcon } from 'lucide-react'

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

interface StockItem {
  name: string
  attack?: number
  defense?: number
  price: number
  type: string
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
    { name: 'Dřevěný meč', attack: 5, price: 50, type: 'weapon' },
    { name: 'Železný meč', attack: 12, price: 150, type: 'weapon' },
    { name: 'Dlouhý meč', attack: 15, price: 200, type: 'weapon' },
    { name: 'Bojová sekera', attack: 18, price: 300, type: 'weapon' },
    { name: 'Kožená zbroj', defense: 8, price: 100, type: 'armor' },
    { name: 'Řetězová zbroj', defense: 15, price: 250, type: 'armor' },
    { name: 'Ocelová zbroj', defense: 20, price: 400, type: 'armor' },
    { name: 'Platová zbroj', defense: 25, price: 600, type: 'armor' },
  ]

  const handleBuy = (item: StockItem) => {
    if (gold < item.price) {
      showMessage('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - item.price)
    const newItem = {
      ...item,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      durability: 100,
      maxDurability: 100,
      level: 0,
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${item.name}.`)
    showMessage(`Koupeno: ${item.name}`)
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
            <p className="py-4 text-center text-xs text-[#8b7355]">Vyber akci z menu vlevo.</p>
          </div>
        ) : selectedAction === 'buy' ? (
          <ServiceTable
            items={stock}
            mode="table"
            columns={[
              {
                key: 'name',
                label: 'Předmět',
                align: 'left',
                render: (item) => <span className="text-[#f5e6d3]">{item.name}</span>,
              },
              {
                key: 'stats',
                label: 'Bonus',
                align: 'center',
                render: (item) => (
                  <>
                    {item.attack && <span className="text-[#ff6b6b]">+{item.attack}</span>}
                    {item.defense && <span className="text-[#69ccf0]">+{item.defense}</span>}
                  </>
                ),
              },
              {
                key: 'price',
                label: 'Cena',
                align: 'right',
                render: (item) => <span className="text-[#ffd700]">{item.price}g</span>,
              },
            ]}
            actions={[
              {
                label: 'Koupit',
                onClick: handleBuy,
                disabled: (item) => gold < item.price,
              },
            ]}
            emptyMessage="Žádné předměty na prodej"
          />
        ) : (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji zbrojíři.
            </p>
          </div>
        )}
      </GamePanel>

      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}
    </GameLayout>
  )
}
