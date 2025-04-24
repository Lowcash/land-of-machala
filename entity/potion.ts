import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Potion } from '@prisma/client'

export type PotionEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const potion = await db.potion.findFirst({
    where: { id },
  })

  if (!potion) return undefined

  return {
    ...potion,
    ...getI18n(potion),
  }
}

export function getI18n(entity: Potion) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
