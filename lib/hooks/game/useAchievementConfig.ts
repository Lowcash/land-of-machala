import { type LucideIcon, Trophy } from 'lucide-react'

import {
  ACHIEVEMENT_RARITY_COLORS,
  type AchievementRarity,
} from '@/lib/game/constants/achievements'

interface UseAchievementConfigProps {
  rarity: AchievementRarity
  icon?: LucideIcon
}

export function useAchievementConfig({ rarity, icon }: UseAchievementConfigProps) {
  const colors = ACHIEVEMENT_RARITY_COLORS[rarity] || ACHIEVEMENT_RARITY_COLORS.COMMON
  const Icon = icon || Trophy

  return {
    colors,
    Icon,
  }
}
