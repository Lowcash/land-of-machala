import { z } from 'zod'

export const moveCharacterSchema = z.object({
  direction: z.enum(['north', 'south', 'east', 'west']),
})
