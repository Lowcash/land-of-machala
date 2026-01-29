import Link from 'next/link'

import { Check } from 'lucide-react'

import { GameGrid } from '@/components/ui/game-grid'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

interface InventoryGridProps {
  inventory: InventoryItemUI[]
  selectedItem: string | null
}

export function InventoryGrid({ inventory, selectedItem }: InventoryGridProps) {
  return (
    <GameGrid columns={{ default: 5, sm: 6, md: 8, lg: 10, xl: 12 }}>
      {inventory.map((item) => {
        const Icon = getIconFromName(item.iconName)
        const isSelected = selectedItem === item.id

        return (
          <Link
            key={item.id}
            href={isSelected ? '?' : `?itemId=${item.id}`} // Toggle select/deselect or just select? Standard is select. Deselect via X in detail.
            className={`group relative flex aspect-square h-auto flex-col items-center justify-center rounded-lg border-2 p-2 transition-all ${
              isSelected
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
          </Link>
        )
      })}
    </GameGrid>
  )
}
