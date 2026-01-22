'use client'

import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

type InventoryGridProps = {
  inventory: InventoryItemUI[]
  selectedItem: string | null
  onSelectItem: (id: string | null) => void
}

export function InventoryGrid({ inventory, selectedItem, onSelectItem }: InventoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ScrollIndicator targetRef={scrollRef} position="both" />
      <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {inventory.map((item) => {
            const Icon = getIconFromName(item.iconName)
            return (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`group relative aspect-square rounded-lg border-2 p-2 transition-all ${
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
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
