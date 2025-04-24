import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Enemy, EnemyIdent } from '@prisma/client'

export type EnemyEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: EnemyIdent) {
  const enemy = await db.enemy.findFirst({
    where: { id },
  })

  if (!enemy) return undefined

  return {
    ...enemy,
    ...getI18n(enemy),
  }
}

export function getI18n(entity: Enemy) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
