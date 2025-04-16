'use server'

import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type Armor } from '@prisma/client'

import { CACHE } from '@/lib/cache'

export const getAll = authActionClient
  .metadata({ actionName: 'armor_getAll' })
  .action(
    async () =>
      (CACHE['armors-key'] ??= (await db.$queryRaw<any[]>`CALL GetArmorsSortedByStats();`).map(getAllMap)) as Armor[],
  )

const getAllMap = (x: any): Armor => ({
  id: x.f0,
  name: x.f1,
  type: x.f2,
  armor: x.f3,
  strength: x.f4,
  agility: x.f5,
  intelligency: x.f6,
})
