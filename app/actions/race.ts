'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { type Race } from '@prisma/client'

import { CACHE } from '@/lib/cache'

export const getAll = actionClient
  .metadata({ actionName: 'race_getAll' })
  .action(async () => (CACHE['races-key'] ??= await db.race.findMany()) as Race[])
