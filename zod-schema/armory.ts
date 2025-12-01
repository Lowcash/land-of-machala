import { z } from 'zod'

import { WEARABLES } from '@/config'

// Zod schemas with satisfies operator for type safety
export const armorySchema = z.object({
  armoryId: z.string().uuid(),
}) satisfies z.ZodType<{ armoryId: string }>

export type ArmorySchema = z.infer<typeof armorySchema>

export const armoryItemActionSchema = z.object({
  armoryId: z.string().uuid(),
  armoryItemId: z.string().uuid(),
  armoryItemType: z.enum(WEARABLES),
}) satisfies z.ZodType<{ armoryId: string; armoryItemId: string; armoryItemType: (typeof WEARABLES)[number] }>

export type ArmoryItemActionSchema = z.infer<typeof armoryItemActionSchema>
