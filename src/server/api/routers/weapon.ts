import { Weapon } from '@prisma/client'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '../trpc'

const cache: Map<string, Weapon[]> = new Map()

export const weaponRoute = createTRPCRouter({
  show: protectedProcedure.query(({ ctx }) => getWeapons(ctx)),
})

export async function getWeapons(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  const cacheKey = `getWeapons_${opt?.sorted ? 'sorted' : 'unsorted'}`

  if (cache.has(cacheKey)) return cache.get(cacheKey)

  let weapons: Weapon[]
  if (opt?.sorted) {
    await ctx.db.$executeRaw`
      CREATE TEMPORARY TABLE WeaponTemp AS
      SELECT id, name, damage_from, damage_to, (damage_from + damage_to) AS stats_sum
      FROM Weapon;
    `

    weapons = await ctx.db.$queryRaw`
      SELECT *
      FROM WeaponTemp
      ORDER BY stats_sum ASC;
    `

    await ctx.db.$executeRaw`
      DROP TEMPORARY TABLE IF EXISTS WeaponTemp;
    `
  } else {
    weapons = await ctx.db.weapon.findMany()
  }

  if (!weapons) throw new Error('Weapons do not exists!')

  cache.set(cacheKey, weapons)
  // setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000); // remove cache after 5 minutes

  return weapons
}
