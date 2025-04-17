'use server'

import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type Weapon } from '@prisma/client'

import { CACHE } from '@/lib/cache'
import { CACHE_KEY } from '@/config'

export const getAll = authActionClient
  .metadata({ actionName: 'weapon_getAll' })
  .action(
    async () =>
      (CACHE[CACHE_KEY.WEAPONS] ??= (await db.$queryRaw<any[]>`CALL GetWeaponsSortedByStats();`).map(
        getAllMap,
      )) as Weapon[],
  )

const getAllMap = (x: any): Weapon => ({
  id: x.f0,
  i18n_key: x.f1,
  damage_from: x.f2,
  damage_to: x.f3,
})
