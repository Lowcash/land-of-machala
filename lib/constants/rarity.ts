import { ItemRarity } from '@/lib/types/game'

/**
 * Rarity color configurations for items
 */
export const RARITY_COLORS: Record<ItemRarity, string> = {
  [ItemRarity.COMMON]: 'text-[#8b7355]',
  [ItemRarity.UNCOMMON]: 'text-[#6fbf6f]',
  [ItemRarity.RARE]: 'text-[#69ccf0]',
  [ItemRarity.EPIC]: 'text-[#b66bd4]',
  [ItemRarity.LEGENDARY]: 'text-[#ffd700]',
} as const

/**
 * Rarity border configurations for items
 */
export const RARITY_BORDERS: Record<ItemRarity, string> = {
  [ItemRarity.COMMON]: 'border-[#8b7355]',
  [ItemRarity.UNCOMMON]: 'border-[#6fbf6f]',
  [ItemRarity.RARE]: 'border-[#69ccf0]',
  [ItemRarity.EPIC]: 'border-[#b66bd4]',
  [ItemRarity.LEGENDARY]: 'border-[#ffd700]',
} as const

/**
 * Rarity sorting order (higher = rarer)
 */
export const RARITY_ORDER: Record<ItemRarity, number> = {
  [ItemRarity.LEGENDARY]: 5,
  [ItemRarity.EPIC]: 4,
  [ItemRarity.RARE]: 3,
  [ItemRarity.UNCOMMON]: 2,
  [ItemRarity.COMMON]: 1,
} as const

/**
 * Gets Tailwind color class for item rarity
 * @param rarity - Item rarity enum value
 * @returns Tailwind text color class
 */
export function getRarityColor(rarity: ItemRarity): string {
  return RARITY_COLORS[rarity] || RARITY_COLORS[ItemRarity.COMMON]
}

/**
 * Gets Tailwind border class for item rarity
 * @param rarity - Item rarity enum value
 * @returns Tailwind border color class
 */
export function getRarityBorder(rarity: ItemRarity): string {
  return RARITY_BORDERS[rarity] || RARITY_BORDERS[ItemRarity.COMMON]
}
