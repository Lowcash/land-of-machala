import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Armor } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

export type ArmorEntity = Armor & ReturnType<typeof getI18n>

export async function getAll() {
  return (CACHE[CACHE_KEY.ARMORS] ??= (await db.$queryRaw<any[]>`CALL GetArmorsSortedByStats();`).map(getAllMap)).map(
    (x: Armor) => ({
      ...x,
      ...getI18n(x),
    }),
  ) as ArmorEntity[]
}

const getAllMap = (x: any): Armor => ({
  id: x.f0,
  i18n_key: x.f1,
  type: x.f2,
  armor: x.f3,
  strength: x.f4,
  agility: x.f5,
  intelligence: x.f6,
})

export function getI18n(entity: Armor) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
