import { createTRPCRouter, protectedProcedure } from '../trpc'
import type { Weapon } from '@prisma/client'
import type { TRPCContext } from '../trpc'

const cache: Map<string, Weapon[]> = new Map()

export const weaponRoute = createTRPCRouter({
  show: protectedProcedure.query(({ ctx }) => getWeapons(ctx)),
})

export async function getWeapons(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  const cacheKey = `getWeapons_${opt?.sorted ? 'sorted' : 'unsorted'}`

  if (cache.has(cacheKey)) return cache.get(cacheKey)

  let weapons: Weapon[]
  if (opt?.sorted) {
    weapons = (await ctx.db.$queryRaw`
      CALL GetWeaponsSortedByStats();
    ` as any[]).map(x => ({
      id: x.f0,
      name: x.f1,
      damage_from: x.f2,
      damage_to: x.f3
    }))
  } else {
    weapons = await ctx.db.weapon.findMany()
  }

  if (!weapons) throw new Error('Weapons do not exists!')

  cache.set(cacheKey, weapons)
  // setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000); // remove cache after 5 minutes

  return weapons
}
