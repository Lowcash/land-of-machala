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

export function getSlotName(slot: string): string {
  switch (slot) {
    case 'HEAD':
      return 'Hlava'
    case 'CHEST':
      return 'Hruď'
    case 'LEGS':
      return 'Nohy'
    case 'FEET':
      return 'Boty'
    case 'HANDS':
      return 'Rukavice'
    case 'WEAPON':
      return 'Zbraň'
    case 'OFFHAND':
      return 'Štít/Vedlejší'
    default:
      return slot
  }
}
