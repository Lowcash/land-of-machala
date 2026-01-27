import { z } from 'zod'

export const getCharacterQuestsSchema = z.object({
  status: z.enum(['AVAILABLE', 'ACTIVE', 'COMPLETED', 'FAILED']).optional(),
})

export const startQuestSchema = z.object({
  questId: z.string(),
})

export const updateObjectiveSchema = z.object({
  questId: z.string(),
  objectiveId: z.string(),
  progress: z.number().int().min(0),
})

export const completeQuestSchema = z.object({
  questId: z.string(),
})

export const abandonQuestSchema = z.object({
  questId: z.string(),
})
