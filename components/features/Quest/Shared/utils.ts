import type { QuestCategory } from './types'

export function getCategoryTypographyColor(
  category: QuestCategory
): 'gold' | 'cold' | 'nature' | 'magic' | 'default' {
  switch (category) {
    case 'MAIN':
      return 'gold'
    case 'SIDE':
      return 'cold'
    case 'DAILY':
      return 'nature'
    case 'EVENT':
      return 'magic'
    default:
      return 'default'
  }
}

export function getCategoryColor(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'text-[#ffd700]'
    case 'SIDE':
      return 'text-[#69ccf0]'
    case 'DAILY':
      return 'text-[#6fbf6f]'
    case 'EVENT':
      return 'text-[#b66bd4]'
  }
}

export type QuestBadgeVariant = 'gold' | 'cold' | 'nature' | 'magic' | 'default'

export function getCategoryBadge(category: QuestCategory): QuestBadgeVariant {
  switch (category) {
    case 'MAIN':
      return 'gold'
    case 'SIDE':
      return 'cold'
    case 'DAILY':
      return 'nature'
    case 'EVENT':
      return 'magic'
    default:
      return 'default'
  }
}

export function getCategoryName(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'Hlavní quest'
    case 'SIDE':
      return 'Vedlejší quest'
    case 'DAILY':
      return 'Denní úkol'
    case 'EVENT':
      return 'Speciální událost'
  }
}
