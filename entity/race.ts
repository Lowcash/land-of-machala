import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Race } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

export type RaceEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const race = await db.race.findFirst({ where: { id } })

  if (!race) return undefined

  return {
    ...race,
    ...getI18n(race),
  }
}

export async function getAll() {
  return (CACHE[CACHE_KEY.RACES] ??= (await db.race.findMany({ orderBy: { order_index: 'asc' } })).map((x) => ({
    ...x,
    ...getI18n(x),
  }))) as RaceEntity[]
}

export function getI18n(entity: Race) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
