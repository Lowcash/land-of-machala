import { z } from 'zod'

export const getSkillsByTreeSchema = z.object({
  tree: z.enum(['COMBAT', 'DEFENSE', 'MAGIC']),
})

export const getCharacterSkillsSchema = z.object({
  tree: z.enum(['COMBAT', 'DEFENSE', 'MAGIC']).optional(),
})

export const unlockSkillSchema = z.object({
  skillId: z.string(),
})

export const increaseRankSchema = z.object({
  skillId: z.string(),
})

export const setActiveSchema = z.object({
  skillId: z.string(),
  active: z.boolean(),
})

export type GetSkillsByTreeInput = z.infer<typeof getSkillsByTreeSchema>
export type GetCharacterSkillsInput = z.infer<typeof getCharacterSkillsSchema>
export type UnlockSkillInput = z.infer<typeof unlockSkillSchema>
export type IncreaseRankInput = z.infer<typeof increaseRankSchema>
export type SetActiveInput = z.infer<typeof setActiveSchema>
