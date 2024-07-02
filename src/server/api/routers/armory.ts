import { z } from 'zod'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import { getWeapons } from './weapon'
import { getArmors } from './armors'

import { WEARABLES } from '@/const'

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

export const armoryRoute = createTRPCRouter({
  show: protectedProcedure.input(z.object({ armoryId: z.string() })).query(async ({ ctx, input }) => {
    const { weapons, armors, ...armory } = await getArmory(ctx, input.armoryId)

    const [buyWeapons, buyArmors, sellWeapons, sellArmors] = await Promise.all([
      getBuyWeapons(ctx, armory.id),
      getBuyArmors(ctx, armory.id),
      getSellWeapons(ctx),
      getSellArmors(ctx),
    ])

    return {
      ...armory,
      buyWeapons,
      buyArmors,
      sellWeapons,
      sellArmors,
    }
  }),
  buy: protectedProcedure
    .input(z.object({ armoryId: z.string(), itemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const inventory = await getInventory(ctx)

      switch (input.itemType) {
        case 'weapon': {
          const weapon = (await getBuyWeapons(ctx, input.armoryId)).find((x) => x.id === input.itemId)

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
            const armor = (await getBuyArmors(ctx, input.armoryId)).find((x) => x.id === input.itemId)

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
  sell: protectedProcedure
    .input(z.object({ armoryId: z.string(), itemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const inventory = await getInventory(ctx)

      switch (input.itemType) {
        case 'weapon': {
          const weapon = (await getSellWeapons(ctx)).find((x) => x.id === input.itemId)

          if (!weapon) throw new Error('Armory does not accept this weapon!')

          const balance = ctx.session.user.money + (weapon?.price ?? 0)

          await ctx.db.$transaction(async (db) => {
            await db.user.update({
              where: { id: ctx.session.user!.id },
              data: {
                money: balance,
              },
            })

            const weaponToDelete = await ctx.db.weaponInInventory.findFirst({
              where: {
                inventory_id: inventory.id,
                weapon_id: weapon.id,
              },
            })

            if (!weaponToDelete) throw new Error('Cannot find weapon in inventory!')

            await ctx.db.weaponInInventory.delete({
              where: {
                id: weaponToDelete.id,
              },
            })

            return { success: true }
          })
          break
        }
        case 'armor':
          {
            const armor = (await getSellArmors(ctx)).find((x) => x.id === input.itemId)

            if (!armor) throw new Error('Armory does not accept this armor!')

            const balance = ctx.session.user.money + (armor?.price ?? 0)

            await ctx.db.$transaction(async (db) => {
              await db.user.update({
                where: { id: ctx.session.user!.id },
                data: {
                  money: balance,
                },
              })

              const armorToDelete = await ctx.db.armorInInventory.findFirst({
                where: {
                  inventory_id: inventory.id,
                  armor_id: armor.id,
                },
              })

              if (!armorToDelete) throw new Error('Cannot find armor in inventory!')

              await ctx.db.armorInInventory.delete({
                where: {
                  id: armorToDelete.id,
                },
              })

              return { success: true }
            })
          }
          break
      }
    }),
})

export async function getArmory(ctx: TRPCContext, id: string) {
  const armory = await ctx.db.armory.findFirst({
    where: { id },
    include: { weapons: { include: { weapon: true } }, armors: { include: { armor: true } } },
  })

  if (!armory) throw new Error('Armory does not exist!')

  return armory
}

async function getBuyWeapons(ctx: TRPCContext, armoryId: string) {
  const armory = await getArmory(ctx, armoryId)
  const weapons = await getWeapons(ctx, { sorted: true })

  const spreadBuyPriceWeapons = spreadItemsPrices(weapons!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.weapons.map((x) => ({
    ...x,
    price: spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

async function getSellWeapons(ctx: TRPCContext) {
  const inventory = await getInventory(ctx)
  const weapons = await getWeapons(ctx, { sorted: true })

  const spreadSellPriceWeapons = spreadItemsPrices(weapons!, SELL_MIN_PRICE, SELL_MAX_PRICE, {
    roundBy: ROUND_PRICE_BY,
  })

  return inventory.weapons_inventory.map((x) => ({
    ...x,
    price: spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

async function getBuyArmors(ctx: TRPCContext, armoryId: string) {
  const armory = await getArmory(ctx, armoryId)
  const armors = await getArmors(ctx, { sorted: true })

  const spreadBuyPriceArmors = spreadItemsPrices(armors!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.armors.map((x) => ({
    ...x,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

async function getSellArmors(ctx: TRPCContext) {
  const inventory = await getInventory(ctx)
  const armors = await getArmors(ctx, { sorted: true })

  const spreadSellPriceArmors = spreadItemsPrices(armors!, SELL_MIN_PRICE, SELL_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return inventory.armors_inventory.map((x) => ({
    ...x,
    price: spreadSellPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

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
