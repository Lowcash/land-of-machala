import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Class } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

export type ClassEntity = Class & ReturnType<typeof getI18n>

export async function getAll() {
  return (CACHE[CACHE_KEY.CLASSES] ??= (await db.class.findMany({ orderBy: { order_index: 'asc' } })).map((x) => ({
    ...x,
    ...getI18n(x),
  }))) as ClassEntity[]
}

export function getI18n(entity: Class) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
