import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { type Place } from '@prisma/client'
import { type PlaceSchema } from '@/zod-schema/place'

export default async function get(p: PlaceSchema) {
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
          name: i18n.t(`${place.hospital.i18n_key}.header` as any),
        }
      : undefined,
    armory: place.armory
      ? {
          ...place.armory,
          name: i18n.t(`${place.armory.i18n_key}.header` as any),
        }
      : undefined,
    bank: place.bank
      ? {
          ...place.bank,
          name: i18n.t(`${place.bank.i18n_key}.header` as any),
        }
      : undefined,
  }
}

export function getI18n(place: Place) {
  return {
    name: i18n.t(`${place.i18n_key}.header` as any),
    description: i18n.t(`${place.i18n_key}.description` as any),
  }
}
