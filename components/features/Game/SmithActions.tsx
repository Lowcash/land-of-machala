'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import type { LucideIcon } from 'lucide-react'
import { Shield, Sword } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ActionsLayout } from './ActionsLayout'

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
  const showMessage = (msg: string) => {
    toast.success(msg)
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
      toast.error('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - item.price)
    const newItem = {
      ...item,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      durability: 100,
      maxDurability: 100,
      level: 0,
      type: item.type as ItemType, // Cast
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${item.name}.`)
    showMessage(`Koupeno: ${item.name}`)
  }

  useEffect(() => {
    setInfoText(
      '"Vítej u mé dílny, dobrodruhu. Hledáš kvalitní zbraně a zbroje? Pokud máš dost zlata a správné materiály, můžu ti vykovat něco výjimečného."'
    )
  }, [setInfoText])

  return (
    <ActionsLayout
      title="Kovář"
      onBack={onBack}
      showDirections={false}
      onToggleDirections={() => {}}
      exploration={
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-3 text-[#ffd700]">
            <span className="text-xs tracking-wider text-[#8b7355] uppercase">Tvé zlato:</span>
            <span className="font-bold">{gold}g</span>
          </div>
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <div className="mb-2 text-[10px] font-bold tracking-wider text-[#8b7355] uppercase">
              Prodej
            </div>
            <p className="py-2 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji kováři. (Brzy dostupné)
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-2">
        <div className="mb-4 space-y-1">
          <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
            &gt; Slyšel jsem o speciálních zakázkách (Quest)
          </button>
          <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
            &gt; Co potřebuješ pro výrobu legendárního meče?
          </button>
        </div>
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
    </ActionsLayout>
  )
}
