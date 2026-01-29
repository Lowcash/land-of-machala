import { ItemRarity } from '@/lib/types/game'

import type { InventoryItemUI } from './types'

export { getIconFromName } from '@/lib/icons'

export const getRarityColor = (rarity: ItemRarity) => {
  switch (rarity) {
    case ItemRarity.COMMON:
      return 'text-[#8b7355]'
    case ItemRarity.UNCOMMON:
      return 'text-[#6fbf6f]'
    case ItemRarity.RARE:
      return 'text-[#69ccf0]'
    case ItemRarity.EPIC:
      return 'text-[#b66bd4]'
    case ItemRarity.LEGENDARY:
      return 'text-[#ffd700]'
    default:
      return 'text-[#8b7355]'
  }
}

export const getRarityBorder = (rarity: ItemRarity) => {
  switch (rarity) {
    case ItemRarity.COMMON:
      return 'border-[#8b7355]'
    case ItemRarity.UNCOMMON:
      return 'border-[#6fbf6f]'
    case ItemRarity.RARE:
      return 'border-[#69ccf0]'
    case ItemRarity.EPIC:
      return 'border-[#b66bd4]'
    case ItemRarity.LEGENDARY:
      return 'border-[#ffd700]'
    default:
      return 'border-[#8b7355]'
  }
}

const RARITY_ORDER: Record<string, number> = {
  [ItemRarity.LEGENDARY]: 5,
  [ItemRarity.EPIC]: 4,
  [ItemRarity.RARE]: 3,
  [ItemRarity.UNCOMMON]: 2,
  [ItemRarity.COMMON]: 1,
}

export function sortInventory(items: InventoryItemUI[]): InventoryItemUI[] {
  return [...items].sort((a, b) => {
    const rarityDiff = (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0)
    if (rarityDiff !== 0) return rarityDiff
    return a.name.localeCompare(b.name)
  })
}
