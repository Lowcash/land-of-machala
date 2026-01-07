import type { Skill as PrismaSkill } from '@prisma/client'

export type SkillCategory = 'combat' | 'defense' | 'magic' | 'stealth' | 'crafting' | 'all'

export type MergedSkill = PrismaSkill & {
  currentLevel: number
  unlocked: boolean
  category: SkillCategory
  cost: number
}
