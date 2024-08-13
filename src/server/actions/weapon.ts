'use server'

import type { Weapon } from '@prisma/client'
import { db } from '@/server/db'
import { unstable_cache as cache } from 'next/cache'

export const WEAPONS_KEY = 'weapons-key'

const mapWeapon = (x: any): Weapon => ({
  id: x.f0,
  name: x.f1,
  damage_from: x.f2,
  damage_to: x.f3,
})

export const getWeapons = cache(
  async () => (await db.$queryRaw<any[]>`CALL GetWeaponsSortedByStats();`).map(mapWeapon),
  [WEAPONS_KEY],
  { tags: [WEAPONS_KEY] },
)
