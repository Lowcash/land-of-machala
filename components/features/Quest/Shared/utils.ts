import type { QuestCategory } from './types'

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

export function getCategoryBadge(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/50'
    case 'SIDE':
      return 'bg-[#69ccf0]/10 text-[#69ccf0] border border-[#69ccf0]/50'
    case 'DAILY':
      return 'bg-[#6fbf6f]/10 text-[#6fbf6f] border border-[#6fbf6f]/50'
    case 'EVENT':
      return 'bg-[#b66bd4]/10 text-[#b66bd4] border border-[#b66bd4]/50'
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
