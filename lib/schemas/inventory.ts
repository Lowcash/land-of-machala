import { z } from 'zod'

export const itemActionSchema = z.object({
  inventoryItemId: z.string(),
})

export type ItemActionInput = z.infer<typeof itemActionSchema>
