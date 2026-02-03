import type { SkillCategory } from './types'

export function getCategoryTypographyColor(
  category: SkillCategory
): 'danger' | 'cold' | 'magic' | 'nature' | 'copper' {
  switch (category) {
    case 'combat':
      return 'danger'
    case 'defense':
      return 'cold'
    case 'magic':
      return 'magic'
    case 'stealth':
      return 'nature'
    case 'crafting':
      return 'copper'
    default:
      return 'copper'
  }
}

export function getCategoryColor(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'text-game-danger'
    case 'defense':
      return 'text-game-info'
    case 'magic':
      return 'text-game-magic'
    case 'stealth':
      return 'text-game-success'
    case 'crafting':
      return 'text-game-copper-muted'
    default:
      return 'text-game-copper-muted'
  }
}

export function getCategoryBg(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'bg-game-danger/10 border-game-danger'
    case 'defense':
      return 'bg-game-info/10 border-game-info'
    case 'magic':
      return 'bg-game-magic/10 border-game-magic'
    case 'stealth':
      return 'bg-game-success/10 border-game-success'
    case 'crafting':
      return 'bg-game-copper/10 border-game-copper'
    default:
      return 'bg-black/40 border-border'
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
      return 'from-game-danger to-red-400'
    case 'defense':
      return 'from-game-info to-blue-300'
    case 'magic':
      return 'from-game-magic to-purple-400'
    case 'stealth':
      return 'from-game-success to-green-400'
    default:
      return 'from-game-copper to-amber-300'
  }
}
