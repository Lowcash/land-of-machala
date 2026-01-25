'use client'

import { Button } from '@/components/ui/button'
import { SMITH_STOCK } from '@/lib/game/data'
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import { LocationLayout } from '../../Shared/components/LocationLayout'
import { ShopInterface, type ShopItem } from '../../Shared/components/ShopInterface'
import type { MarketItem, MarketItemType } from '../Market/types'

interface SmithShopProps {
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: MarketItem[]
  setInventory: (val: MarketItem[] | ((prev: MarketItem[]) => MarketItem[])) => void
}

export function SmithShop({ gold, setGold, inventory, setInventory }: SmithShopProps) {
  const handleBuy = (item: ShopItem) => {
    const newItem: MarketItem = {
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      name: item.name,
      type: item.type as MarketItemType,
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

  return (
    <LocationLayout
      title="Dílna mistra kováře"
      description="Hledáš-li ocel, co tě nezradí, jsi na správném místě, poutníku."
    >
      <ShopInterface gold={gold} items={SMITH_STOCK as unknown as ShopItem[]} onBuy={handleBuy} />

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
    </LocationLayout>
  )
}
