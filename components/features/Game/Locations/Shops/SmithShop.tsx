'use client'

import { Typography } from '@/components/ui/typography'
import { SMITH_STOCK } from '@/lib/game/data'
import { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ShopInterface, type ShopItem } from '../../Shared/components/ShopInterface'
import type { MarketItem } from '../Market/types'

interface SmithShopProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
}

export function SmithShop({ onBack, gold, setGold, inventory, setInventory }: SmithShopProps) {
  const handleBuy = (item: ShopItem) => {
    // Create new item from stock
    const newItem: MarketItem = {
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      name: item.name,
      type: item.type as any,
      icon: item.icon as LucideIcon,
      price: item.price,
      attack: item.attack,
      defense: item.defense,
      durability: 100,
      maxDurability: 100,
      level: 0,
      equipped: false,
    }

    setGold((g) => g - item.price)
    setInventory((prev) => [...prev, newItem])
    toast.success(`Koupeno: ${item.name}`)
  }

  const columns = [
    { key: 'name', label: 'Název' },
    {
      key: 'description',
      label: 'Popis',
      render: (item: any) => (
        <div>
          <div>{item.description}</div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            {item.attack && <span className="text-game-danger">Útok: +{item.attack}</span>}
            {item.defense && <span className="text-game-info">Obrana: +{item.defense}</span>}
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Cena',
      render: (item: any) => <span className="text-game-gold">{item.price}g</span>,
    },
  ]

  const customContent = (
    <div className="space-y-2">
      <Typography variant="h4">Speciální zakázky</Typography>
      <div className="flex flex-col gap-1">
        <button className="text-game-copper-muted hover:text-game-gold text-left text-sm transition-colors">
          &gt; Slyšel jsem o speciálních mečích (Quest)
        </button>
        <button className="text-game-copper-muted hover:text-game-gold text-left text-sm transition-colors">
          &gt; Co potřebuješ pro opravu brnění?
        </button>
      </div>
    </div>
  )

  return (
    <ShopInterface
      title="Mistr Kovář"
      greeting="Vítej u mé dílny, dobrodruhu. Hledáš kvalitní zbraně a zbroje? Pokud máš dost zlata a správné materiály, můžu ti vykovat něco výjimečného."
      gold={gold}
      items={SMITH_STOCK as unknown as ShopItem[]}
      onBuy={handleBuy}
      onBack={onBack}
      itemColumns={columns}
      customContent={customContent}
    />
  )
}
