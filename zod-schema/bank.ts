import { z } from 'zod'

import { WEARABLES } from '@/config'

// Zod schemas with satisfies operator for type safety
export const bankSchema = z.object({
  bankId: z.string().uuid(),
}) satisfies z.ZodType<{ bankId: string }>

export type BankSchema = z.infer<typeof bankSchema>

const bankItemSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(WEARABLES),
}) satisfies z.ZodType<{ id: string; type: (typeof WEARABLES)[number] }>

export const bankActionSchema = z.object({
  bankId: z.string().uuid(),
  item: bankItemSchema.optional(),
  money: z.number().optional(),
}) satisfies z.ZodType<{ bankId: string; item?: { id: string; type: (typeof WEARABLES)[number] }; money?: number }>

export type BankActionSchema = z.infer<typeof bankActionSchema>
