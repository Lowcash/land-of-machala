'use client'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GameGrid } from '@/components/ui/game-grid'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

type InventoryGridProps = {
  inventory: InventoryItemUI[]
  selectedItem: string | null
  onSelectItem: (id: string | null) => void
}

export function InventoryGrid({ inventory, selectedItem, onSelectItem }: InventoryGridProps) {
  return (
    <GameGrid columns={{ default: 5, sm: 6, md: 8, lg: 10, xl: 12 }}>
      {inventory.map((item) => {
        const Icon = getIconFromName(item.iconName)
        return (
          <Button
            key={item.id}
            onClick={() => onSelectItem(item.id)}
            variant="ghost"
            className={`group relative aspect-square h-auto rounded-lg border-2 p-2 transition-all ${
              selectedItem === item.id
                ? 'scale-105 border-[#ffd700] bg-black/60 shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                : `bg-black/40 hover:bg-black/60 ${getRarityBorder(item.rarity)}`
            }`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Icon className={`h-8 w-8 ${getRarityColor(item.rarity)}`} />
            </div>

            {item.quantity > 1 && (
              <div className="absolute right-1 bottom-1 rounded border border-[#8b6f47] bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {item.quantity}
              </div>
            )}

            {item.equipped && (
              <div className="absolute top-1 right-1 rounded-full bg-[#ffd700] p-0.5 text-black shadow-sm">
                <Check className="h-3 w-3" />
              </div>
            )}
          </Button>
        )
      })}
    </GameGrid>
  )
}
