import { z } from 'zod'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './player'

import { WEARABLES } from '@/const'

export const armoryRoute = createTRPCRouter({
  show: protectedProcedure
    .input(z.object({ armoryId: z.string() }))
    .query(({ ctx, input }) => getArmory(ctx, input.armoryId)),
  buy: protectedProcedure
    .input(z.object({ armoryId: z.string(), itemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const armory = await getArmory(ctx, input.armoryId)
      const inventoryId = (await getInventory(ctx))?.id

      if (!inventoryId) return { success: false }

      switch (input.itemType) {
        case 'weapon': {
          const weapon = armory.weapons.find((x) => x.id === input.itemId)

          if (!weapon) throw new Error('Armory does not have weapon!')

          const balance = ctx.session.user.money - (weapon?.price ?? 0)

          if (balance < 0) return { success: false }

          await ctx.db.$transaction(async (db) => {
            await db.user.update({
              where: { id: ctx.session.user!.id },
              data: {
                money: balance,
              },
            })

            await ctx.db.weaponInInventory.create({
              data: {
                weapon_id: weapon.id,
                inventory_id: inventoryId,
              },
            })

            return { success: true }
          })
          break
        }
        case 'armor':
          {
            const armor = armory.armors.find((x) => x.id === input.itemId)

            if (!armor) throw new Error('Armory does not have armor!')

            const balance = ctx.session.user.money - (armor?.price ?? 0)

            if (balance < 0) return { success: false }

            await ctx.db.$transaction(async (db) => {
              await db.user.update({
                where: { id: ctx.session.user!.id },
                data: {
                  money: balance,
                },
              })

              await ctx.db.armorInInventory.create({
                data: {
                  armor_id: armor.id,
                  inventory_id: inventoryId,
                },
              })

              return { success: true }
            })
          }
          break
      }
    }),
})

async function getArmory(ctx: TRPCContext, id: string) {
  const armory = await ctx.db.armory.findFirst({
    where: { id },
    include: { weapons: { include: { weapon: true } }, armors: { include: { armor: true } } },
  })

  if (!armory) throw new Error('Armory does not exist!')

  return armory
}
