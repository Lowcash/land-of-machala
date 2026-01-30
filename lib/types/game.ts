import type { Character as PrismaCharacter } from '@prisma/client'
import { ItemRarity, ItemType } from '@prisma/client'
import type { LucideIcon } from 'lucide-react'

// View Types
export type View = 'town' | 'smith' | 'bank' | 'healer' | 'tavern' | 'market' | 'board' | 'forest'

export interface Buff {
  name: string
  stat: string
  val: number
  expiresAt?: Date
}

export interface ViewConfig {
  bg: string
  title: string
  icon: LucideIcon
  desc: string
}

// Character Types
export interface CharacterData extends Omit<
  PrismaCharacter,
  'createdAt' | 'updatedAt' | 'lastPlayedAt' | 'locationX' | 'locationY' | 'currentView'
> {
  reputation?: number
  achievements?: string[] // IDs of unlocked achievements
  nextLevelExp?: number
  x?: number
  y?: number
  stats?: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
}

export interface CharacterItem {
  id: string
  name: string
  slot?: string | null
  attack?: number
  defense?: number
  damage?: number
  value: number
  equipped?: boolean
  icon?: LucideIcon
  type?: string
  iconName?: string
}

export { ItemRarity, ItemType }

export type AppRoute = '/character' | '/skills' | '/quests' | '/inventory' | '/map' | '/game'

export interface UnlockedAchievement {
  title: string
  rewards: {
    gold: number
    xp: number
    title: string | null
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: ItemRarity
  category: string
  maxProgress: number
  rewardGold: number
  rewardXp: number
  rewardTitle: string | null
  // Character specific fields
  unlocked?: boolean
  progress?: number
  unlockedAt?: Date | null
}

export interface ActivityLogEntry {
  id: string
  timestamp: Date
  message: string
  type: string
  metadata?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
