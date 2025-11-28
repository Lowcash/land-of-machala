import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Armor, ArmorType } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

// Type for stored procedure result columns (f0, f1, f2, etc.)
interface ArmorProcedureResult {
  f0: string // id
  f1: string // i18n_key
  f2: ArmorType // type
  f3: number // armor
  f4: number // strength
  f5: number // agility
  f6: number // intelligence
}

export type ArmorEntity = Armor & ReturnType<typeof getI18n>

export async function getAll() {
  return (CACHE[CACHE_KEY.ARMORS] ??= (await db.$queryRaw<ArmorProcedureResult[]>`CALL GetArmorsSortedByStats();`).map(
    getAllMap,
  )).map((x: Armor) => ({
    ...x,
    ...getI18n(x),
  })) as ArmorEntity[]
}

const getAllMap = (x: ArmorProcedureResult): Armor => ({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    name: i18n.t(`${entity.i18n_key}.header` as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
