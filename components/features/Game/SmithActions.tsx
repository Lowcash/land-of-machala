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
  const [mode, setMode] = useState<'shop' | 'talk'>('shop')
  const [shopCategory, setShopCategory] = useState<'weapons' | 'armor' | 'items'>('weapons')
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const weapons = [
    {
      name: 'Dřevěný meč',
      attack: 5,
      price: 50,
      type: 'weapon',
      icon: Swords,
      iconColor: 'text-[#8b7355]',
      iconBg: 'bg-[#8b7355]/20',
      description: 'Základní zbraň pro začátečníky',
    },
    {
      name: 'Železný meč',
      attack: 12,
      price: 150,
      type: 'weapon',
      icon: Swords,
      iconColor: 'text-[#d4a574]',
      iconBg: 'bg-[#d4a574]/20',
      description: 'Spolehlivý meč z kvalitní oceli',
    },
    {
      name: 'Dlouhý meč',
      attack: 15,
      price: 200,
      type: 'weapon',
      icon: Swords,
      iconColor: 'text-[#ff6b6b]',
      iconBg: 'bg-[#ff6b6b]/20',
      description: 'Ostré, vyvážené ostří',
    },
    {
      name: 'Bojová sekera',
      attack: 18,
      price: 300,
      type: 'weapon',
      icon: Swords,
      iconColor: 'text-[#ff6b6b]',
      iconBg: 'bg-[#ff6b6b]/20',
      description: 'Devastující síla v boji',
    },
  ]

  const armor = [
    {
      name: 'Kožená zbroj',
      defense: 8,
      price: 100,
      type: 'armor',
      icon: Shield,
      iconColor: 'text-[#8b7355]',
      iconBg: 'bg-[#8b7355]/20',
      description: 'Lehká ochrana pro rychlé bojovníky',
    },
    {
      name: 'Řetězová zbroj',
      defense: 15,
      price: 250,
      type: 'armor',
      icon: Shield,
      iconColor: 'text-[#69ccf0]',
      iconBg: 'bg-[#69ccf0]/20',
      description: 'Solidní ochrana proti zbraním',
    },
    {
      name: 'Ocelová zbroj',
      defense: 20,
      price: 400,
      type: 'armor',
      icon: Shield,
      iconColor: 'text-[#69ccf0]',
      iconBg: 'bg-[#69ccf0]/20',
      description: 'Těžká ochrana pro válečníky',
    },
    {
      name: 'Platová zbroj',
      defense: 25,
      price: 600,
      type: 'armor',
      icon: Shield,
      iconColor: 'text-[#ffd700]',
      iconBg: 'bg-[#ffd700]/20',
      description: 'Nejlepší možná ochrana',
    },
  ]

  const items = [
    {
      name: 'Brousek',
      attack: 2,
      price: 30,
      type: 'consumable',
      icon: Package,
      iconColor: 'text-[#d4a574]',
      iconBg: 'bg-[#d4a574]/20',
      description: 'Naostří tvou zbraň',
    },
    {
      name: 'Opravná sada',
      defense: 2,
      price: 30,
      type: 'consumable',
      icon: Package,
      iconColor: 'text-[#d4a574]',
      iconBg: 'bg-[#d4a574]/20',
      description: 'Opraví poškozenou zbroj',
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

  const getCurrentStock = () => {
    switch (shopCategory) {
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
                onClick={() => setMode('shop')}
                icon={Store}
                className={mode === 'shop' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Služby, zbraně, zbroje a předměty</span>
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

      <GamePanel title={mode === 'shop' ? 'Obchod zbrojíře' : 'Rozhovor'}>
        {message && (
          <div className="mb-3 flex items-center gap-2 rounded border border-[#6fbf6f] bg-[#6fbf6f]/20 p-2 text-xs text-[#6fbf6f]">
            <Store className="h-4 w-4" />
            {message}
          </div>
        )}

        {mode === 'shop' ? (
          <>
            {/* Category tabs */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setShopCategory('weapons')}
                className={`flex flex-1 items-center justify-center gap-2 rounded border px-3 py-2 text-xs transition-all ${
                  shopCategory === 'weapons'
                    ? 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700]'
                    : 'border-[#8b6f47]/30 bg-black/40 text-[#d4a574] hover:border-[#ffd700] hover:bg-black/60'
                }`}
              >
                <Swords className="h-4 w-4" />
                <span>Zbraně</span>
              </button>
              <button
                onClick={() => setShopCategory('armor')}
                className={`flex flex-1 items-center justify-center gap-2 rounded border px-3 py-2 text-xs transition-all ${
                  shopCategory === 'armor'
                    ? 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700]'
                    : 'border-[#8b6f47]/30 bg-black/40 text-[#d4a574] hover:border-[#ffd700] hover:bg-black/60'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>Zbroje</span>
              </button>
              <button
                onClick={() => setShopCategory('items')}
                className={`flex flex-1 items-center justify-center gap-2 rounded border px-3 py-2 text-xs transition-all ${
                  shopCategory === 'items'
                    ? 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700]'
                    : 'border-[#8b6f47]/30 bg-black/40 text-[#d4a574] hover:border-[#ffd700] hover:bg-black/60'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Předměty</span>
              </button>
            </div>

            {/* Shop items */}
            <ServiceTable
              items={getCurrentStock()}
              mode="cards"
              columns={[
                { key: 'name', label: 'Název' },
                {
                  key: 'description',
                  label: 'Popis',
                  render: (item) => (
                    <div>
                      <div className="mb-1 text-xs">
                        {item.attack && <span className="text-[#ff6b6b]">Útok +{item.attack}</span>}
                        {item.defense && (
                          <span className="text-[#69ccf0]">Obrana +{item.defense}</span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8b7355]">{item.description}</div>
                      <div className="mt-1 text-[#ffd700]">{item.price}g</div>
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
                return <Icon className={`h-4 w-4 ${item.iconColor}`} />
              }}
              emptyMessage="Žádné předměty na prodej"
            />
          </>
        ) : (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              &quot;Jsem zdejší kovář a zbrojíř. Mé výrobky jsou nejlepší v širém okolí. Co chceš
              vědět?&quot;
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setMode('shop')}
                className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]"
              >
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
        )}
      </GamePanel>
    </GameLayout>
  )
}
