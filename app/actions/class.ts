'use server'

import { db } from '@/lib/db'
import i18next from '@/lib/i18n'
import { actionClient } from '@/lib/safe-action'
import { type Class } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY, ERROR_CAUSE } from '@/config'

export const show = actionClient.metadata({ actionName: 'class_show' }).action(async () => {
  const classes = await getAll().then((x) => x?.data)

  if (!classes) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  return classes.map(({ i18n_key, ...x }) => ({
    ...x,
    name: i18next.t(`${i18n_key}.header` as any),
  }))
})

export const getAll = actionClient
  .metadata({ actionName: 'class_getAll' })
  .action(async () => (CACHE[CACHE_KEY.CLASSES] ??= await db.class.findMany()) as Class[])
