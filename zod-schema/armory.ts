import { z } from 'zod'

import { WEARABLES } from '@/config'

export const armorySchema = z.object({ armoryId: z.string() })

export type ArmorySchema = z.infer<typeof armorySchema>

export const armoryItemActionSchema = z.object({
  armoryId: z.string(),
  armoryItemId: z.string(),
  armoryItemType: z.enum(WEARABLES),
})

export type ArmoryItemActionSchema = z.infer<typeof armoryItemActionSchema>
