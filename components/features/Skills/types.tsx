import type { Skill as PrismaSkill } from '@prisma/client'

export type SkillCategory = 'combat' | 'defense' | 'magic' | 'utility' | 'all'

export type MergedSkill = PrismaSkill & {
  currentLevel: number
  unlocked: boolean
  category: SkillCategory
  cost: number
}
