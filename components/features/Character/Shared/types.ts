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
  talentPoints: number
  nextLevelExp?: number
  stats?: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
}

import type { LucideIcon } from 'lucide-react'

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
