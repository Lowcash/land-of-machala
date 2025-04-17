'use server'

import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { placeSchema } from '@/zod-schema/place'

export const get = authActionClient
  .metadata({ actionName: 'place_get' })
  .schema(placeSchema)
  .action(async ({ parsedInput }) =>
    db.place.findFirst({
      where: { x_min: parsedInput.posX, y_min: parsedInput.posY },
      include: {
        hospital: true,
        armory: true,
        bank: true,
      },
    }),
  )
