import { getIconFromName } from '@/lib/icons'

/**
 * Gets the appropriate icon component for an achievement
 * Uses centralized icon map from lib/icons.ts
 * @param iconName - Name of the icon from achievement data
 * @returns Lucide icon component
 */
export function getAchievementIcon(iconName: string) {
  return getIconFromName(iconName)
}

/**
 * Filter button configurations for achievement list
 */
export const ACHIEVEMENT_FILTER_BUTTONS = [
  { id: 'all' as const, label: 'Vše' },
  { id: 'unlocked' as const, label: 'Získáno' },
  { id: 'locked' as const, label: 'Uzamčeno' },
] as const

export const ACHIEVEMENT_SEARCH_PLACEHOLDER = 'Hledat úspěchy...' as const
