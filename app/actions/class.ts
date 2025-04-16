'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { type Class } from '@prisma/client'

import { CACHE } from '@/lib/cache'

export const getAll = actionClient
  .metadata({ actionName: 'class_getAll' })
  .action(async () => (CACHE['classes-key'] ??= await db.class.findMany()) as Class[])
