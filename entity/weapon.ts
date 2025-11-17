import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Weapon } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

// Type for stored procedure result columns (f0, f1, f2, f3)
interface WeaponProcedureResult {
  f0: string // id
  f1: string // i18n_key
  f2: number // damage_from
  f3: number // damage_to
}

export type WeaponEntity = Weapon & ReturnType<typeof getI18n>

export async function getAll() {
  return (CACHE[CACHE_KEY.WEAPONS] ??= (
    await db.$queryRaw<WeaponProcedureResult[]>`CALL GetWeaponsSortedByStats();`
  ).map(getAllMap)).map((x: Weapon) => ({
    ...x,
    ...getI18n(x),
  })) as WeaponEntity[]
}

const getAllMap = (x: WeaponProcedureResult): Weapon => ({
  id: x.f0,
  i18n_key: x.f1,
  damage_from: x.f2,
  damage_to: x.f3,
})

export function getI18n(entity: Weapon) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
