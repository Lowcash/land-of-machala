import Link from 'next/link'

import { GameGrid } from '@/components/ui/game-grid'
import { IconBox } from '@/components/ui/icon-box'

import { getIconFromName } from '../Shared/inventoryUtils'
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
          <IconBox
            key={item.id}
            as={Link}
            href={isSelected ? '?' : `?itemId=${item.id}`}
            icon={Icon}
            rarity={item.rarity}
            isSelected={isSelected}
            isEquipped={item.equipped}
            quantity={item.quantity}
            square
          />
        )
      })}

      {/* Empty Slots */}
      {emptySlots.map((_, idx) => (
        <IconBox key={`empty-${idx}`} isEmpty square />
      ))}
    </GameGrid>
  )
}
