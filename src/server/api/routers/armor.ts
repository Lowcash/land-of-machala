import type { Armor } from '@prisma/client'
import type { TRPCContext } from '../trpc'

const cache: Map<string, Armor[]> = new Map()

export async function getArmors(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  const cacheKey = `getArmors_${opt?.sorted ? 'sorted' : 'unsorted'}`

  if (cache.has(cacheKey)) return cache.get(cacheKey)

  let armors: Armor[]
  if (opt?.sorted) {
    armors = (await ctx.db.$queryRaw`
      CALL GetArmorsSortedByStats();
    ` as any[]).map(x => ({
      id: x.f0,
      name: x.f1,
      type: x.f2,
      armor: x.f3,
      strength: x.f4,
      agility: x.f5,
      intelligency: x.f6,
    }))
  } else {
    armors = await ctx.db.armor.findMany()
  }

  if (!armors) throw new Error('Armors do not exists!')

  cache.set(cacheKey, armors)

  return armors
}
