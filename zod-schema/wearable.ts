import { z } from 'zod'

import { WEARABLES } from '@/config'

export const wearableActionSchema = z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() })

export type WearableActionSchema = z.infer<typeof wearableActionSchema>

export const consumableActionSchema = z.object({ inventoryConsumableId: z.string() })

export type ConsumableActionSchema = z.infer<typeof consumableActionSchema>