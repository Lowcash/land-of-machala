import { Trophy } from 'lucide-react'

import { ACHIEVEMENTS, ACHIEVEMENT_ICONS } from '@/lib/game/data'

import type { CharacterData, CharacterItem } from './types'

export function calculateDerivedStats(character: CharacterData, inventory: CharacterItem[]) {
  const equipped = inventory.filter((item) => item.equipped)

  const baseAttack = character.strength * 2
  const equipmentAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttack + equipmentAttack

  const baseDefense = character.stamina * 1.5
  const equipmentDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)
  const totalDefense = Math.floor(baseDefense + equipmentDefense)

  return {
    totalAttack,
    totalDefense,
    baseAttack,
    baseDefense,
    equipmentAttack,
    equipmentDefense,
  }
}

export function enrichAchievements(characterAchievements: string[] | null | undefined) {
  return ACHIEVEMENTS.map((ach) => ({
    id: ach.id,
    name: ach.name,
    description: ach.desc,
    icon: ACHIEVEMENT_ICONS[ach.id] || Trophy,
    unlocked: characterAchievements?.includes(String(ach.id)) ?? ach.id === 1,
  }))
}
