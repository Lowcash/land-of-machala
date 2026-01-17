'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import { Coins, Home, MessageSquare, Shield, Store, Sword } from 'lucide-react'
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
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | 'talk' | null>(null)
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
      name: 'Bojová sekera',
      attack: 18,
      price: 300,
      type: 'weapon',
      description: 'Brutální zbraň s masivním úderem',
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
    {
      name: 'Platová zbroj',
      defense: 25,
      price: 600,
      type: 'armor',
      description: 'Nejlepší ochrana pro opravdové hrdiny',
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
            <ActionBtn
              onClick={() => setSelectedAction('talk')}
              icon={MessageSquare}
              className={selectedAction === 'talk' ? 'border-[#ffd700] bg-black/60' : ''}
            >
              <span className="flex w-full items-center justify-between">
                <span>Mluvit se zbrojířem</span>
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
            mode="cards"
            columns={[
              { key: 'name', label: 'Název' },
              {
                key: 'description',
                label: 'Popis',
                render: (item) => (
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
                disabled: (item) => gold < item.price,
              },
            ]}
            rowIcon={(item) => {
              const Icon = item.icon
              return (
                <Icon
                  className={`h-4 w-4 ${item.type === 'weapon' ? 'text-[#ff6b6b]' : 'text-[#69ccf0]'}`}
                />
              )
            }}
            emptyMessage="Žádné předměty na prodej"
          />
        ) : selectedAction === 'sell' ? (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji zbrojíři.
            </p>
          </div>
        ) : selectedAction === 'talk' ? (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              &quot;Vítej u mé dílny, dobrodruhu. Hledáš kvalitní zbraně a zbroje? Nebo tě možná
              zajímá speciální zakázka? Pokud máš dost zlata a správné materiály, můžu ti vykovat
              něco výjimečného.&quot;
            </p>
            <div className="space-y-2">
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Slyšel jsem o speciálních zakázkách (Quest)
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Co potřebuješ pro výrobu legendárního meče?
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Jaké materiály nabízíš? (Zpět k obchodu)
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">Vyber akci z menu vlevo.</p>
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
