import { Backpack, Heart, Shield, Sparkles, Sword, Zap, type LucideIcon } from 'lucide-react'
import type { InventoryItemUI, ItemRarity } from './types'

export const ICON_MAP: Record<string, LucideIcon> = {
  sword: Sword,
  shield: Shield,
  heart: Heart,
  zap: Zap,
  sparkles: Sparkles,
  backpack: Backpack,
}

export function getIconFromName(iconName: string): LucideIcon {
  return ICON_MAP[(iconName || '').toLowerCase()] || Sparkles
}

export const getRarityColor = (rarity: ItemRarity) => {
  switch (rarity) {
    case 'common':
      return 'text-[#8b7355]'
    case 'uncommon':
      return 'text-[#6fbf6f]'
    case 'rare':
      return 'text-[#69ccf0]'
    case 'epic':
      return 'text-[#b66bd4]'
    case 'legendary':
      return 'text-[#ffd700]'
    default:
      return 'text-[#8b7355]'
  }
}

export const getRarityBorder = (rarity: ItemRarity) => {
  switch (rarity) {
    case 'common':
      return 'border-[#8b7355]'
    case 'uncommon':
      return 'border-[#6fbf6f]'
    case 'rare':
      return 'border-[#69ccf0]'
    case 'epic':
      return 'border-[#b66bd4]'
    case 'legendary':
      return 'border-[#ffd700]'
    default:
      return 'border-[#8b7355]'
  }
}

const RARITY_ORDER: Record<string, number> = {
  legendary: 5,
  epic: 4,
  rare: 3,
  uncommon: 2,
  common: 1,
}

export function sortInventory(items: InventoryItemUI[]): InventoryItemUI[] {
  return [...items].sort((a, b) => {
    const rarityDiff = (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0)
    if (rarityDiff !== 0) return rarityDiff
    return a.name.localeCompare(b.name)
  })
}
