import { z } from 'zod'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import { getWeapons } from './weapon'
import { getArmors } from './armors'

import { WEARABLES } from '@/const'
import { Weapon } from '@prisma/client'

const MIN_PRICE = 1000
const MAX_PRICE = 50000

const ROUN_PRICE_BY = 100

export const armoryRoute = createTRPCRouter({
  show: protectedProcedure.input(z.object({ armoryId: z.string() })).query(async ({ ctx, input }) => {
    const armory = await getArmory(ctx, input.armoryId)
    const weapons = await getWeapons(ctx, { sorted: true })
    const armors = await getArmors(ctx, { sorted: true })

    const spreadPriceWeapons = spreadItemsPrices(weapons, MIN_PRICE, MAX_PRICE, { roundBy: ROUN_PRICE_BY })
    const spreadPriceArmors = spreadItemsPrices(armors, MIN_PRICE, MAX_PRICE, { roundBy: ROUN_PRICE_BY })

    return {
      ...armory,
      weapons: armory.weapons.map(x => ({
        ...x,
        price: spreadPriceWeapons.find(
          (y) => y.id === x.weapon_id,
        )?.price ?? 0,
      })),
      armors: armory.armors.map(x => ({
        ...x,
        price: spreadPriceArmors.find(
          (y) => y.id === x.armor_id,
        )?.price ?? 0,
      })),
    }
  }),
  buy: protectedProcedure
    .input(z.object({ armoryId: z.string(), itemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const armory = await getArmory(ctx, input.armoryId)
      const inventory = await getInventory(ctx)

      if (!inventory) return { success: false }

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
                inventory_id: inventory.id,
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
                  inventory_id: inventory.id,
                },
              })

              return { success: true }
            })
          }
          break
      }
    }),
})

function spreadItemsPrices<T extends { id: string | number }>(
  sortedItemsAsc: T[],
  minPrice: number,
  maxPrice: number,
  opt?: { roundBy?: number },
) {
  const roundBy = opt?.roundBy ?? 1

  const priceStep = (maxPrice - minPrice) / (sortedItemsAsc.length ?? 0)

  return sortedItemsAsc.map((x, idx) => ({
    id: x.id,
    price: Math.round((minPrice + (idx + 1) * priceStep) / roundBy) * roundBy,
  }))
}

export async function getArmory(ctx: TRPCContext, id: string) {
  const armory = await ctx.db.armory.findFirst({
    where: { id },
    include: { weapons: { include: { weapon: true } }, armors: { include: { armor: true } } },
  })

  if (!armory) throw new Error('Armory does not exist!')

  return armory
}
