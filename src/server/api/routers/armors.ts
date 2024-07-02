import { Armor } from '@prisma/client'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '../trpc'

const cache: Map<string, Armor[]> = new Map()

export const armorRoute = createTRPCRouter({
  show: protectedProcedure.query(({ ctx }) => getArmors(ctx)),
})

export async function getArmors(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  const cacheKey = `getArmors_${opt?.sorted ? 'sorted' : 'unsorted'}`

  if (cache.has(cacheKey)) return cache.get(cacheKey)

  let armors: Armor[]
  if (opt?.sorted) {
    await ctx.db.$executeRaw`
      CREATE TEMPORARY TABLE ArmorTemp AS
      SELECT id, name, armor, strength, agility, intelligency, (armor + strength + agility + intelligency) AS stats_sum
      FROM Armor;
    `

    armors = await ctx.db.$queryRaw`
      SELECT *
      FROM ArmorTemp
      ORDER BY stats_sum ASC;
    `

    await ctx.db.$executeRaw`
      DROP TEMPORARY TABLE IF EXISTS ArmorTemp;
    `
  } else {
    armors = await ctx.db.armor.findMany()
  }

  if (!armors) throw new Error('Armors do not exists!')

  cache.set(cacheKey, armors)

  return armors
}
