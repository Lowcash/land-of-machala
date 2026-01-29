import type { ItemRarity, ItemType } from '@/lib/types/game'

export type { ItemRarity, ItemType }

export type InventoryItemUI = {
  id: string
  name: string
  type: ItemType
  rarity: ItemRarity
  iconName: string
  slot: string | null
  equipped: boolean
  value: number
  level: number
  description: string | null
  quantity: number
  // Stats
  attack?: number
  defense?: number
  magic?: number
  speed?: number
  healing?: number
  mana?: number
}
