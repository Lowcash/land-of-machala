import { z } from 'zod'

export const performActionSchema = z.object({
  enemyId: z.string(),
  enemyCurrentHp: z.number().int().min(0),
  action: z.enum(['attack', 'defend', 'special', 'flee']),
})

export const useItemSchema = z.object({
  itemId: z.string(),
})

export const startCombatSchema = z.object({
  enemyId: z.string(),
  enemyHp: z.number(),
})

export const updateCombatSchema = z.object({
  playerHp: z.number(),
  enemyHp: z.number(),
  turn: z.enum(['player', 'enemy']),
})

export const initiateCombatSchema = z.object({
  enemyId: z.string().nullable().optional(),
})

export const endCombatSchema = z.object({
  result: z.enum(['victory', 'defeat', 'flee']),
})
