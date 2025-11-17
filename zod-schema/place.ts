import { z } from 'zod'

export const coordinatesSchema = z.object({
  posX: z.number(),
  posY: z.number(),
})

export type CoordinatesSchema = z.infer<typeof coordinatesSchema>
