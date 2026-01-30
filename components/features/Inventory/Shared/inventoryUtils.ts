import { RARITY_ORDER } from '@/lib/constants/rarity'

import type { InventoryItemUI } from './types'

export { getRarityBorder, getRarityColor } from '@/lib/constants/rarity'
export { getIconFromName } from '@/lib/icons'

/**
 * Sorts inventory items by rarity (rarest first), then alphabetically
 * @param items - Array of inventory items to sort
 * @returns Sorted array (non-mutating)
 */
export function sortInventory(items: InventoryItemUI[]): InventoryItemUI[] {
  return [...items].sort((a, b) => {
    const rarityDiff = (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0)
    if (rarityDiff !== 0) return rarityDiff
    return a.name.localeCompare(b.name)
  })
}
