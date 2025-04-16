import { z } from 'zod'

export const placeSchema = z.object({
  posX: z.number(),
  posY: z.number(),
})

export type PlaceSchema = z.infer<typeof placeSchema>
