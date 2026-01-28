import type { LucideIcon } from 'lucide-react'

// View Types
export type View = 'town' | 'smith' | 'bank' | 'healer' | 'tavern' | 'market'

export interface ViewConfig {
  bg: string
  title: string
  icon: LucideIcon
  desc: string
}

// Character Types
export interface CharacterData {
  id: string
  name: string
  level: number
  race: string
  class: string
  experience: number
  hp: number
  maxHp: number
  mana: number
  maxMana: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
  physicalResistance: number
  magicalResistance: number
  fireResistance: number
  coldResistance: number
  poisonResistance: number
  reputation?: number
  gold: number
  bankGold?: number
  talentPoints?: number
  achievements?: string[] // IDs of unlocked achievements
  userId: string
  nextLevelExp?: number
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
