import { z } from 'zod'

export const getCategorySchema = z.object({
  category: z.enum(['COMBAT', 'EXPLORATION', 'QUESTS', 'SOCIAL', 'COLLECTION', 'PROGRESSION']),
})

export const updateProgressSchema = z.object({
  achievementId: z.string(),
  progress: z.number().int().min(0),
})

export const incrementProgressSchema = z.object({
  achievementId: z.string(),
  amount: z.number().int().min(1).default(1),
})

export const unlockSchema = z.object({
  achievementId: z.string(),
})

export type GetCategoryInput = z.infer<typeof getCategorySchema>
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>
export type IncrementProgressInput = z.infer<typeof incrementProgressSchema>
export type UnlockInput = z.infer<typeof unlockSchema>

export const getAllAchievementsSchema = z.object({
  includeHidden: z.boolean().default(false),
})
