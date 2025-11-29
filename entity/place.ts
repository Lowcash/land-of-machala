import 'server-only'

import { t } from '@/lib/i18n'
import { db } from '@/lib/db'
import { type Place } from '@prisma/client'
import { type CoordinatesSchema } from '@/zod-schema/place'

export type PlaceEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(p: CoordinatesSchema) {
  const place = await db.place.findFirst({
    where: {
      x_min: { lte: p.posX },
      x_max: { gte: p.posX },
      y_min: { lte: p.posY },
      y_max: { gte: p.posY },
    },
    include: {
      hospital: true,
      armory: true,
      bank: true,
    },
  })

  if (!place) return undefined

  return {
    ...place,
    ...getI18n(place),
    hospital: place.hospital
      ? {
          ...place.hospital,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
          name: t(`${place.hospital.i18n_key}.header` as any),
        }
      : undefined,
    armory: place.armory
      ? {
          ...place.armory,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
          name: t(`${place.armory.i18n_key}.header` as any),
        }
      : undefined,
    bank: place.bank
      ? {
          ...place.bank,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
          name: t(`${place.bank.i18n_key}.header` as any),
        }
      : undefined,
  }
}

export function getI18n(entity: Place) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    name: t(`${entity.i18n_key}.header` as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    description: t(`${entity.i18n_key}.description` as any),
  }
}
