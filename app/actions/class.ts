'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { type Class } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config/cache-keys'

export const getAll = actionClient
  .metadata({ actionName: 'class_getAll' })
  .action(async () => (CACHE[CACHE_KEY.CLASSES] ??= await db.class.findMany()) as Class[])
