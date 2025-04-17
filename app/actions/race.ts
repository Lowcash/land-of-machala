'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { type Race } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config/cache-keys'

export const getAll = actionClient
  .metadata({ actionName: 'race_getAll' })
  .action(async () => (CACHE[CACHE_KEY.RACES] ??= await db.race.findMany()) as Race[])
