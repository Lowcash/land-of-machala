import type { SkillCategory } from './types'

export function getCategoryColor(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'text-[#ff6b6b]'
    case 'defense':
      return 'text-[#69ccf0]'
    case 'magic':
      return 'text-[#b66bd4]'
    case 'stealth':
      return 'text-[#6fbf6f]'
    case 'crafting':
      return 'text-[#d4a574]'
    default:
      return 'text-[#d4a574]'
  }
}

export function getCategoryBg(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'bg-[#ff6b6b]/10 border-[#ff6b6b]'
    case 'defense':
      return 'bg-[#69ccf0]/10 border-[#69ccf0]'
    case 'magic':
      return 'bg-[#b66bd4]/10 border-[#b66bd4]'
    case 'stealth':
      return 'bg-[#6fbf6f]/10 border-[#6fbf6f]'
    case 'crafting':
      return 'bg-[#d4a574]/10 border-[#d4a574]'
    default:
      return 'bg-black/40 border-[#8b6f47]'
  }
}

export function getCategoryName(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'Boj'
    case 'defense':
      return 'Obrana'
    case 'magic':
      return 'Magie'
    case 'stealth':
      return 'Stealth'
    case 'crafting':
      return 'Řemeslo'
    default:
      return 'Užitečné'
  }
}
export function getCategoryGradient(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'from-[#ff6b6b] to-[#ff8b8b]'
    case 'defense':
      return 'from-[#69ccf0] to-[#89dcff]'
    case 'magic':
      return 'from-[#b66bd4] to-[#d68bf4]'
    case 'stealth':
      return 'from-[#6fbf6f] to-[#8fdf8f]'
    default:
      return 'from-[#d4a574] to-[#e4b584]'
  }
}
