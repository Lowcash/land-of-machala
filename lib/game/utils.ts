import type { SkillCategory } from '@/components/features/Skills/Shared/types'

export function treeToCategory(tree: string): SkillCategory {
  const treeStr = String(tree)
  switch (treeStr) {
    case 'COMBAT':
      return 'combat'
    case 'DEFENSE':
      return 'defense'
    case 'MAGIC':
      return 'magic'
    case 'STEALTH':
      return 'stealth'
    case 'CRAFTING':
      return 'crafting'
    default:
      return 'combat'
  }
}
