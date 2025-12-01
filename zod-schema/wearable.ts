import { z } from 'zod'

import { WEARABLES } from '@/config'

// Zod schemas with satisfies operator for type safety
export const wearableActionSchema = z.object({
  type: z.enum(WEARABLES),
  inventoryWearableId: z.string().uuid(),
}) satisfies z.ZodType<{ type: (typeof WEARABLES)[number]; inventoryWearableId: string }>

export type WearableActionSchema = z.infer<typeof wearableActionSchema>

export const consumableActionSchema = z.object({
  inventoryConsumableId: z.string().uuid(),
}) satisfies z.ZodType<{ inventoryConsumableId: string }>

export type ConsumableActionSchema = z.infer<typeof consumableActionSchema>
