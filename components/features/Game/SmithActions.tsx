'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, Shield, Sword } from 'lucide-react'
import { useState } from 'react'
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
}

interface StockItem {
  name: string
  attack?: number
  defense?: number
  price: number
  type: string
  description?: string
  icon: LucideIcon
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
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // ARMORY SHOP STOCK (from design repo)
  const stock = [
    {
      name: 'Dřevěný meč',
      attack: 5,
      price: 50,
      type: 'weapon',
      description: 'Základní zbraň pro začátečníky',
      icon: Sword,
    },
    {
      name: 'Železný meč',
      attack: 12,
      price: 150,
      type: 'weapon',
      description: 'Spolehlivý meč z tvrdého železa',
      icon: Sword,
    },
    {
      name: 'Dlouhý meč',
      attack: 15,
      price: 200,
      type: 'weapon',
      description: 'Delší dosah, větší síla',
      icon: Sword,
    },
    {
      name: 'Kožená zbroj',
      defense: 8,
      price: 100,
      type: 'armor',
      description: 'Lehká ochrana pro rychlé bojovníky',
      icon: Shield,
    },
    {
      name: 'Řetězová zbroj',
      defense: 15,
      price: 250,
      type: 'armor',
      description: 'Kovové kroužky poskytují solidní ochranu',
      icon: Shield,
    },
    {
      name: 'Ocelová zbroj',
      defense: 20,
      price: 400,
      type: 'armor',
      description: 'Odolná pancéřová výstroj',
      icon: Shield,
    },
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
      type: item.type as ItemType // Cast
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${item.name}.`)
    showMessage(`Koupeno: ${item.name}`)
  }

  const subsections = [
    {
       title: 'ZBRANĚ A ZBROJE',
       content: (
          <div>
            <ServiceTable
            items={stock}
            mode="cards"
            columns={[
              { key: 'name', label: 'Název' },
              {
                key: 'description',
                label: 'Popis',
                render: (item: StockItem) => (
                  <div>
                    <div>{item.description}</div>
                    <div className="mt-1 flex items-center gap-2">
                      {item.attack && <span className="text-[#ff6b6b]">Útok: +{item.attack}</span>}
                      {item.defense && (
                        <span className="text-[#69ccf0]">Obrana: +{item.defense}</span>
                      )}
                      <span className="text-[#ffd700]">{item.price}g</span>
                    </div>
                  </div>
                ),
              },
            ]}
            actions={[
              {
                label: 'Koupit',
                onClick: handleBuy,
                disabled: (item: StockItem) => gold < item.price,
              },
            ]}
            rowIcon={(item: StockItem) => {
              const Icon = item.icon
              return (
                <Icon
                  className={`h-4 w-4 ${item.type === 'weapon' ? 'text-[#ff6b6b]' : 'text-[#69ccf0]'}`}
                />
              )
            }}
            emptyMessage="Žádné předměty na prodej"
          />
          </div>
       ),
       defaultOpen: true
    },
    {
        title: 'PRODEJ',
        content: (
             <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
                <p className="py-4 text-center text-xs text-[#8b7355]">
                  Vyber předměty z batohu k prodeji zbrojíři (Funkce bude dostupná po propojení s inventářem).
                </p>
             </div>
        )
    },
    {
        title: 'ROZHOVOR',
        content: (
           <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
             <p className="text-sm text-[#d4a574] italic">
               &quot;Vítej u mé dílny, dobrodruhu. Hledáš kvalitní zbraně a zbroje? Pokud máš dost zlata a správné materiály, můžu ti vykovat
               něco výjimečného.&quot;
             </p>
             <div className="space-y-2">
               <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                 &gt; Slyšel jsem o speciálních zakázkách (Quest)
               </button>
               <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                 &gt; Co potřebuješ pro výrobu legendárního meče?
               </button>
             </div>
           </div>
        )
    }
  ]
  
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8b7355] transition-colors hover:text-[#d4a574]"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět do města
        </button>
      </div>
      
      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}

      <GamePanel title="Zbrojíř" subsections={subsections} />
    </div>
  )
}
