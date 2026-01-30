import Link from 'next/link'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

import { GameGrid } from '@/components/ui/game-grid'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

interface InventoryGridProps {
  inventory: InventoryItemUI[]
  selectedItem: string | null
}

export function InventoryGrid({ inventory, selectedItem }: InventoryGridProps) {
  // 2. Derived Values
  const maxSlots = 20 // This should ideally be a prop, but for now we set a common default or derive
  const emptySlotsCount = Math.max(0, maxSlots - inventory.length)
  const emptySlots = Array.from({ length: emptySlotsCount })

  return (
    <GameGrid columns={{ default: 5, sm: 6, md: 8, lg: 10, xl: 12 }}>
      {inventory.map((item) => {
        const Icon = getIconFromName(item.iconName)
        const isSelected = selectedItem === item.id

        return (
          <Link
            key={item.id}
            href={isSelected ? '?' : `?itemId=${item.id}`}
            className={cn(
              'group relative flex aspect-square h-auto flex-col items-center justify-center rounded-lg border-2 p-2 transition-all',
              isSelected
                ? 'scale-105 border-[#ffd700] bg-black/60 shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                : `bg-black/40 hover:bg-black/60 ${getRarityBorder(item.rarity)}`,
              item.rarity === 'LEGENDARY' &&
                'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-yellow-900/20 to-transparent',
              item.rarity === 'EPIC' &&
                'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-900/20 to-transparent',
              item.rarity === 'RARE' &&
                'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 to-transparent'
            )}
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

      {/* Empty Slots */}
      {emptySlots.map((_, idx) => (
        <div
          key={`empty-${idx}`}
          className="aspect-square rounded-lg border-2 border-[#8b6f47]/10 bg-black/20 opacity-40"
        ></div>
      ))}
    </GameGrid>
  )
}
