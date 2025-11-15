import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Hospital } from '@prisma/client'

import { getI18n as getPotionI18n } from '@/entity/potion'

export type HospitalEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const hospital = await db.hospital.findFirst({
    where: { id },
    include: {
      potions_hospital: { include: { potion: true } },
    },
  })

  if (!hospital) return undefined

  return {
    ...hospital,
    ...getI18n(hospital),
    potions_hospital: hospital.potions_hospital.map((x) => ({
      ...x,
      potion: {
        ...x.potion,
        ...getPotionI18n(x.potion),
      },
    })),
  }
}

export function getI18n(entity: Hospital) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    name: i18n.t(`${entity.i18n_key}.header` as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
