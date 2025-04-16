'use server'

import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type Weapon } from '@prisma/client'

import { CACHE } from '@/lib/cache'

export const getAll = authActionClient
  .metadata({ actionName: 'weapon_getAll' })
  .action(
    async () =>
      (CACHE['weapons-key'] ??= (await db.$queryRaw<any[]>`CALL GetWeaponsSortedByStats();`).map(
        getAllMap,
      )) as Weapon[],
  )

const getAllMap = (x: any): Weapon => ({
  id: x.f0,
  name: x.f1,
  damage_from: x.f2,
  damage_to: x.f3,
})
