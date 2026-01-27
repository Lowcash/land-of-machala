import { z } from 'zod'

export const travelToLocationSchema = z.object({
  locationId: z.string(),
})
