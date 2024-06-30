import { Weapon } from '@prisma/client'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '../trpc'

export const weaponRoute = createTRPCRouter({
  show: protectedProcedure.query(({ ctx }) => getWeapons(ctx)),
})

export async function getWeapons(ctx: TRPCContext, opt?: { sorted?: boolean }) {
  let weapons: Weapon[]
  if (opt?.sorted) {
    weapons = await ctx.db.$queryRaw`
    SELECT * from Weapon
    ORDER BY ("damage_from" + "damage_to") ASC
    `
  } else {
    weapons = await ctx.db.weapon.findMany()
  }

  if (!weapons) throw new Error('Weapons do not exists!')

  return weapons
}
