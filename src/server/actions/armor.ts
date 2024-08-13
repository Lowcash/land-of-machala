'use server'

import type { Armor } from '@prisma/client'
import { db } from '@/server/db'
import { unstable_cache as cache } from 'next/cache'

export const ARMORS_KEY = 'armors-key'

const mapArmor = (x: any): Armor => ({
  id: x.f0,
  name: x.f1,
  type: x.f2,
  armor: x.f3,
  strength: x.f4,
  agility: x.f5,
  intelligency: x.f6,
})

export const getArmors = cache(
  async () => (await db.$queryRaw<any[]>`CALL GetArmorsSortedByStats();`).map(mapArmor),
  [ARMORS_KEY],
  { tags: [ARMORS_KEY] },
)
