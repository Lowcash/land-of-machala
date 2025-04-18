'use server'

import { db } from '@/lib/db'
import i18n from '@/lib/i18n'
import { actionClient } from '@/lib/safe-action'
import { type Race } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY, ERROR_CAUSE } from '@/config'

export const show = actionClient.metadata({ actionName: 'race_show' }).action(async () => {
  const races = await getAll().then((x) => x?.data)

  if (!races) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  return races.map(({ i18n_key, ...x }) => ({
    ...x,
    name: i18n.t(`${i18n_key}.header` as any),
  }))
})

export const getAll = actionClient
  .metadata({ actionName: 'race_getAll' })
  .action(
    async () => (CACHE[CACHE_KEY.RACES] ??= await db.race.findMany({ orderBy: { order_index: 'asc' } })) as Race[],
  )
