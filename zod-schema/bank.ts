import { z } from 'zod'

import { WEARABLES } from '@/config'

export const bankSchema = z.object({ bankId: z.string() })

export type BankSchema = z.infer<typeof bankSchema>

const bankItemSchema = z.object({ id: z.string(), type: z.enum(WEARABLES) })

export const bankActionSchema = z.object({
  bankId: z.string(),
  item: bankItemSchema.optional(),
  money: z.number().optional(),
})

export type BankActionSchema = z.infer<typeof bankActionSchema>
