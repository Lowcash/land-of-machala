'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import { ChevronRight, Home, Package, ScrollText, Shield, Store, Swords } from 'lucide-react'
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
  const [mode, setMode] = useState<'services' | 'weapons' | 'armor' | 'items' | 'talk'>(
    'services'
  )
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const weapons = [
    { name: 'Dřevěný meč', attack: 5, price: 50, type: 'weapon' },
    { name: 'Železný meč', attack: 12, price: 150, type: 'weapon' },
    { name: 'Dlouhý meč', attack: 15, price: 200, type: 'weapon' },
    { name: 'Bojová sekera', attack: 18, price: 300, type: 'weapon' },
  ]

  const armor = [
    { name: 'Kožená zbroj', defense: 8, price: 100, type: 'armor' },
    { name: 'Řetězová zbroj', defense: 15, price: 250, type: 'armor' },
    { name: 'Ocelová zbroj', defense: 20, price: 400, type: 'armor' },
    { name: 'Platová zbroj', defense: 25, price: 600, type: 'armor' },
  ]

  const items = [
    { name: 'Brousek', attack: 2, price: 30, type: 'consumable' },
    { name: 'Opravná sada', defense: 2, price: 30, type: 'consumable' },
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

  const getCurrentStock = () => {
    switch (mode) {
      case 'weapons':
        return weapons
      case 'armor':
        return armor
      case 'items':
        return items
      default:
        return []
    }
  }

  return (
    <GameLayout>
      <GamePanel title="Zbrojíř">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <ActionBtn onClick={onBack} icon={Home}>
              <span>Vrátit se do města</span>
            </ActionBtn>
            <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
              <ActionBtn
                onClick={() => setMode('services')}
                icon={Store}
                className={mode === 'services' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Služby</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn
                onClick={() => setMode('weapons')}
                icon={Swords}
                className={mode === 'weapons' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Zbraně</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn
                onClick={() => setMode('armor')}
                icon={Shield}
                className={mode === 'armor' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Zbroje</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn
                onClick={() => setMode('items')}
                icon={Package}
                className={mode === 'items' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Předměty</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn
                onClick={() => setMode('talk')}
                icon={ScrollText}
                className={mode === 'talk' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Mluvit se zbrojířem</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
            </div>
          </div>
        </div>
      </GamePanel>

      <GamePanel
        title={
          mode === 'services'
            ? 'Služby zbrojíře'
            : mode === 'weapons'
              ? 'Zbraně'
              : mode === 'armor'
                ? 'Zbroje'
                : mode === 'items'
                  ? 'Předměty'
                  : 'Rozhovor'
        }
      >
        {message && (
          <div className="mb-3 flex items-center gap-2 rounded border border-[#6fbf6f] bg-[#6fbf6f]/20 p-2 text-xs text-[#6fbf6f]">
            <Store className="h-4 w-4" />
            {message}
          </div>
        )}

        {mode === 'services' ? (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              &quot;Vítej u mé výhně! Nabízím kvalitní zbraně, pevné zbroje a užitečné předměty.
              Co tě zajímá?&quot;
            </p>
            <div className="grid gap-2 text-xs">
              <button
                onClick={() => setMode('weapons')}
                className="w-full border border-[#8b6f47]/30 bg-black/40 p-3 text-left transition-colors hover:border-[#ffd700] hover:bg-black/60"
              >
                <div className="flex items-center gap-2">
                  <Swords className="h-4 w-4 text-[#ff6b6b]" />
                  <div>
                    <div className="text-[#f5e6d3]">Zbraně</div>
                    <div className="text-[10px] text-[#8b7355]">
                      Meče, sekery a další útočné výbava
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setMode('armor')}
                className="w-full border border-[#8b6f47]/30 bg-black/40 p-3 text-left transition-colors hover:border-[#ffd700] hover:bg-black/60"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#69ccf0]" />
                  <div>
                    <div className="text-[#f5e6d3]">Zbroje</div>
                    <div className="text-[10px] text-[#8b7355]">
                      Kožená, řetězová a platová ochrana
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setMode('items')}
                className="w-full border border-[#8b6f47]/30 bg-black/40 p-3 text-left transition-colors hover:border-[#ffd700] hover:bg-black/60"
              >
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#d4a574]" />
                  <div>
                    <div className="text-[#f5e6d3]">Předměty</div>
                    <div className="text-[10px] text-[#8b7355]">Brousky, opravné sady a další</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : mode === 'talk' ? (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              &quot;Jsem zdejší kovář a zbrojíř. Mé výrobky jsou nejlepší v širém okolí. Co chceš
              vědět?&quot;
            </p>
            <div className="space-y-2">
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Potřebuji novou zbroj (Zpět k nabídce)
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Kde najdu vzácné kovy?
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Slyšel jsem o problémech s bandity (Quest)
              </button>
            </div>
          </div>
        ) : (
          <ServiceTable
            items={getCurrentStock()}
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
        )}
      </GamePanel>
    </GameLayout>
  )
}
