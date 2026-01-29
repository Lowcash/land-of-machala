'use client'

import { toast } from 'sonner'

import { SMITH_STOCK } from '@/lib/game/constants/items'
import { ItemTypes } from '@/lib/game/constants/mechanics'

import { Button } from '@/components/ui/button'

import { type TradeItem, TradePanel } from '../../Shared/components/TradePanel'
import type { MarketItem } from '../Market/types'

interface SmithShopProps {
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
}

export function SmithShop({ gold, setGold, inventory, setInventory }: SmithShopProps) {
  const handleBuy = (tradeItem: TradeItem) => {
    // Find item details from stock
    const originalItem = SMITH_STOCK.find((i) => i.name === tradeItem.name)

    if (!originalItem) return

    if (gold < tradeItem.price) {
      toast.error('Nemáš dost zlata!')
      return
    }

    const newItem: MarketItem = {
      id: Math.max(0, ...inventory.map((i) => Number(i.id))) + 1,
      name: originalItem.name,
      type: originalItem.type || ItemTypes.WEAPON,
      icon: originalItem.icon,
      price: originalItem.price,
      attack: 'attack' in originalItem ? originalItem.attack : undefined,
      defense: 'defense' in originalItem ? originalItem.defense : undefined,
      durability: 100,
      maxDurability: 100,
      level: 0,
      equipped: false,
    }

    setGold((g) => g - tradeItem.price)
    setInventory((prev) => [...prev, newItem])
    toast.success(`Koupeno: ${tradeItem.name}`)
  }

  const tradeItems: TradeItem[] = SMITH_STOCK.map((s) => ({
    id: s.name,
    name: s.name,
    description: s.description,
    price: s.price,
    icon: s.icon,
    type: s.type,
    canHaggle: false,
  }))

  const repairContent = (
    <div className="pt-2">
      <h5 className="mb-2 text-[10px] font-bold text-[#8b7355] uppercase">Služby a opravy</h5>
      <Button
        variant="game-secondary"
        className="h-8 w-full justify-start px-3 text-[10px]"
        disabled
      >
        &gt; Poptat opravu vybavení (připravuje se)
      </Button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="mb-2 text-center text-sm text-[#8b7355] italic">
        &quot;Hledáš-li ocel, co tě nezradí, jsi na správném místě, poutníku.&quot;
      </div>

      <TradePanel
        items={tradeItems}
        onAction={handleBuy}
        actionLabel="Koupit"
        emptyMessage="Kovář nic nenabízí."
      />

      {repairContent}
    </div>
  )
}
