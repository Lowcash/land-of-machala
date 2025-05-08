import { z } from 'zod'
import { type Location } from '@/types'
import { locationKeys } from '@/config'

export const backgroundSchema = z.object({
  location: z.enum(locationKeys as [Location, ...Location[]]),
})

export const coordinatesSchema = z.object({
  posX: z.number(),
  posY: z.number(),
})

export type CoordinatesSchema = z.infer<typeof coordinatesSchema>
