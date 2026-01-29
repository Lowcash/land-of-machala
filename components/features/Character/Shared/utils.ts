import { Trophy } from 'lucide-react'

import { ACHIEVEMENTS, ACHIEVEMENT_ICONS } from '@/lib/game/constants/items'

export { calculateDerivedStats } from '@/lib/game/formulas'

export function enrichAchievements(characterAchievements: string[] | null | undefined) {
  return ACHIEVEMENTS.map((ach) => ({
    id: ach.id,
    name: ach.name,
    description: ach.desc,
    icon: ACHIEVEMENT_ICONS[ach.id] || Trophy,
    unlocked: characterAchievements?.includes(String(ach.id)) ?? ach.id === 1,
  }))
}
