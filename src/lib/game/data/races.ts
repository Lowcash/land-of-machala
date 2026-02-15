import racesData from './races.json'

export interface RaceStats {
  hp: number
  mana: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

export interface RaceInfo {
  id: string
  nameKey: string
  descriptionKey: string
  bonusKey: string
  icon: string
  stats: RaceStats
}

export const RACES = racesData as RaceInfo[]
