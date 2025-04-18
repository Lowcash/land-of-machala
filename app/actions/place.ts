'use server'

import { db } from '@/lib/db'
import i18n from '@/lib/i18n'
import { authActionClient } from '@/lib/safe-action'
import { placeSchema } from '@/zod-schema/place'

import { ERROR_CAUSE } from '@/config'

export const get = authActionClient
  .metadata({ actionName: 'place_get' })
  .schema(placeSchema)
  .action(async ({ parsedInput }) => {
    const place = await db.place.findFirst({
      where: { x_min: parsedInput.posX, y_min: parsedInput.posY },
      include: {
        hospital: true,
        armory: true,
        bank: true,
      },
    })

    if (!place) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...place,
      name: i18n.t(`${place.i18n_key}.header` as any),
      description: i18n.t(`${place.i18n_key}.description` as any),
    }
  })
