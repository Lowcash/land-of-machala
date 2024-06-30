import { Armor } from '@prisma/client'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '../trpc'

export const armorRoute = createTRPCRouter({
  show: protectedProcedure.query(({ ctx }) => getArmors(ctx)),
})

export async function getArmors(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  let armors: Armor[]
  if (opt?.sorted)
    armors = await ctx.db.$queryRaw`
    SELECT * from Armor
    ORDER BY ("armor" + "strength" + "agility" + "intelligency") ASC
  `
  else {
    armors = await ctx.db.armor.findMany()
  }

  if (!armors) throw new Error('Armors do not exists!')

  return armors
}
