import classesData from './classes.json'

export interface ClassInfo {
  id: string
  nameKey: string
  descriptionKey: string
  bonusKey: string
  icon: string
  statMod: {
    hp: number
    mana: number
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
}

export const CLASSES = classesData as ClassInfo[]
