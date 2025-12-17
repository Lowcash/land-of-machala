import type { CharacterClass, ItemRarity, ItemType, QuestStatus } from '@prisma/client'
import type { LucideIcon } from 'lucide-react'

export type { CharacterClass, ItemRarity, ItemType, QuestStatus }

export interface GameItem {
  id: number | string
  name: string
  type: ItemType
  rarity?: ItemRarity
  icon?: LucideIcon
  attack?: number
  defense?: number
  healing?: number
  value: number
  equipped?: boolean
  quantity?: number
  count?: number
  description?: string
  durability?: number
  maxDurability?: number
  level?: number
  strength?: number
  intelligence?: number
  agility?: number
  stamina?: number
  mana?: number
  slot?: string
  speed?: number
  magic?: number
  stackable?: boolean
}

export interface Buff {
  id: string
  name: string
  duration: number
  effect: string
  stat?: string
  value?: number
  icon?: LucideIcon
}

export interface CharacterWithStats {
  id: string
  userId: string
  name: string
  class: CharacterClass
  level: number
  experience: number
  experienceMax: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  gold: number
  stats: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  } | null
}

export interface InventoryItemWithDetails {
  id: string
  quantity: number
  equipped: boolean
  item: {
    id: string
    name: string
    description: string
    type: ItemType
    rarity: ItemRarity
    value: number
    weight: number
    attackBonus: number | null
    defenseBonus: number | null
    healthBonus: number | null
  }
}

export interface QuestWithProgress {
  id: string
  title: string
  description: string
  reward: number
  rewardXp: number
  requiredLevel: number
  progress?: {
    status: QuestStatus
    progress: number
    startedAt: Date
    completedAt: Date | null
  }
}

export interface SkillWithLevel {
  id: string
  name: string
  description: string
  maxLevel: number
  class: CharacterClass | null
  characterSkill?: {
    level: number
  }
}
