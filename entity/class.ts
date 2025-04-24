import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Class } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

export type ClassEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const class_ = await db.class.findFirst({ where: { id } })

  if (!class_) return undefined

  return {
    ...class_,
    ...getI18n(class_),
  }
}

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
