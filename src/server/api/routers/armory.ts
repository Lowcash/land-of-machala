import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import type { TRPCContext } from '@/server/api/trpc'
import { getInventory } from './inventory'
import { getWeapons } from './weapon'
import { getArmors } from './armor'
import { getUser } from './user'

import { ERROR_CAUSE, WEARABLES } from '@/const'

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
    .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx)
      const inventory = await getInventory(ctx)

      switch (input.itemType) {
        case 'weapon': {
          const armoryWeapon = (await getBuyWeapons(ctx, input.armoryId)).find((x) => x.id === input.armoryItemId)

          if (!armoryWeapon) throw new Error('Armory does not have weapon!')

          const balance = user.money - (armoryWeapon?.price ?? 0)

          if (balance < 0) return { success: false }

          await ctx.db.$transaction(async (db) => {
            await db.user.update({
              where: { id: user.id },
              data: { money: balance },
            })

            await db.weaponInInventory.create({
              data: {
                weapon_id: armoryWeapon.weapon_id,
                inventory_id: inventory.id,
              },
            })

            return { success: true }
          })
          break
        }
        case 'armor':
          {
            const armoryArmor = (await getBuyArmors(ctx, input.armoryId)).find((x) => x.id === input.armoryItemId)

            if (!armoryArmor) throw new Error('Armory does not have armor!')

            const balance = user.money - (armoryArmor?.price ?? 0)

            if (balance < 0) return { success: false }

            await ctx.db.$transaction(async (db) => {
              await db.user.update({
                where: { id: user.id },
                data: { money: balance },
              })

              await db.armorInInventory.create({
                data: {
                  armor_id: armoryArmor.armor_id,
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
    .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), itemType: z.enum(WEARABLES) }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx)
      const inventory = await getInventory(ctx)

      switch (input.itemType) {
        case 'weapon': {
          const armoryWeapon = (await getSellWeapons(ctx)).find((x) => x.id === input.armoryItemId)

          if (!armoryWeapon) throw new Error('Armory does not accept this weapon!')

          const balance = user.money + (armoryWeapon?.price ?? 0)

          await ctx.db.$transaction(async (db) => {
            await db.user.update({
              where: { id: user.id },
              data: {
                money: balance,
              },
            })

            const weaponToDelete = await db.weaponInInventory.findFirst({
              where: {
                inventory_id: inventory.id,
                weapon_id: armoryWeapon.weapon_id,
              },
            })

            if (!weaponToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

            await db.weaponInInventory.delete({
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
            const armoryArmor = (await getSellArmors(ctx)).find((x) => x.id === input.armoryItemId)

            if (!armoryArmor) throw new Error('Armory does not accept this armor!')

            const balance = user.money + (armoryArmor?.price ?? 0)

            await ctx.db.$transaction(async (db) => {
              await db.user.update({
                where: { id: user.id },
                data: { money: balance },
              })

              const armorToDelete = await db.armorInInventory.findFirst({
                where: {
                  inventory_id: inventory.id,
                  armor_id: armoryArmor.armor_id,
                },
              })

              if (!armorToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

              await db.armorInInventory.delete({
                where: { id: armorToDelete.id },
              })

              return { success: true }
            })
          }
          break
      }
    }),
})

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
  const armors = await getArmors()

  const spreadBuyPriceArmors = spreadItemsPrices(armors!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.armors.map((x) => ({
    ...x,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

async function getSellArmors(ctx: TRPCContext) {
  const inventory = await getInventory(ctx)
  const armors = await getArmors()

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

export async function getArmory(ctx: TRPCContext, id: string) {
  const armory = await ctx.db.armory.findFirst({
    where: { id },
    include: { weapons: { include: { weapon: true } }, armors: { include: { armor: true } } },
  })

  if (!armory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return armory
}
