import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Hospital } from '@prisma/client'

import * as PotionEntity from '@/entity/potion'

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
        ...PotionEntity.getI18n(x.potion),
      },
    })),
  }
}

export function getI18n(entity: Hospital) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
