'use server'

import { z } from 'zod'
import { db } from '../db'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as ArmorAction from './armor'
import * as WeaponAction from './weapon'
import * as PlayerAction from './player'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const get = protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
  const armory = await db.armory.findFirst({
    where: { id: input.armoryId },
    include: {
      weapons: { include: { weapon: true } },
      armors: { include: { armor: true } },
    },
  })

  if (!armory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return armory
})

export const show = protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
  const armory = await get({ armoryId: input.armoryId })

  const [buyWeapons, buyArmors, sellWeapons, sellArmors] = await Promise.all([
    getBuyWeapons({ armoryId: armory.id }),
    getBuyArmors({ armoryId: armory.id }),
    getSellWeapons(),
    getSellArmors(),
  ])

  return { ...armory, buyWeapons, buyArmors, sellWeapons, sellArmors }
})

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

async function getBuyWeapons(args: { armoryId: string }) {
  const [armory, weapons] = await Promise.all([get({ armoryId: args.armoryId }), WeaponAction.getAll()])

  const spreadBuyPriceWeapons = spreadItemsPrices(weapons, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.weapons.map((x) => ({
    ...x,
    price: spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

async function getSellWeapons() {
  const [inventory, weapons] = await Promise.all([InventoryAction.get(), WeaponAction.getAll()])

  const spreadSellPriceWeapons = spreadItemsPrices(weapons!, SELL_MIN_PRICE, SELL_MAX_PRICE, {
    roundBy: ROUND_PRICE_BY,
  })

  return inventory.weapons_inventory.map((x) => ({
    ...x,
    price: spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

async function getBuyArmors(args: { armoryId: string }) {
  const [armory, armors] = await Promise.all([get({ armoryId: args.armoryId }), ArmorAction.getAll()])

  const spreadBuyPriceArmors = spreadItemsPrices(armors!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.armors.map((x) => ({
    ...x,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

async function getSellArmors() {
  const [inventory, armors] = await Promise.all([InventoryAction.get(), ArmorAction.getAll()])

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

export const buyItem = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await PlayerAction.get()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await getBuyWeapons({ armoryId: input.armoryId })).find(
          (x) => x.id === input.armoryItemId,
        )

        if (!armoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money - (armoryWeapon?.price ?? 0)

        if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })

          await db.weaponInInventory.create({
            data: {
              weapon_id: armoryWeapon.weapon_id,
              inventory_id: (await InventoryAction.get()).id,
            },
          })
        })

        break
      }
      case 'armor': {
        const armoryArmor = (await getBuyArmors({ armoryId: input.armoryId })).find((x) => x.id === input.armoryItemId)

        if (!armoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money - (armoryArmor?.price ?? 0)

        if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })

          await db.armorInInventory.create({
            data: {
              armor_id: armoryArmor.armor_id,
              inventory_id: (await InventoryAction.get()).id,
            },
          })
        })

        break
      }
    }
  })

export const sellItem = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await PlayerAction.get()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await getSellWeapons()).find((x) => x.id === input.armoryItemId)

        if (!armoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryWeapon?.price ?? 0)

        await db.$transaction(async (db) => {
          const weaponToDelete = await db.weaponInInventory.findFirst({
            where: {
              inventory_id: (await InventoryAction.get()).id,
              weapon_id: armoryWeapon.weapon_id,
            },
          })

          if (!weaponToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

          await db.weaponInInventory.delete({
            where: {
              id: weaponToDelete.id,
            },
          })

          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })
        })

        break
      }
      case 'armor': {
        const armoryArmor = (await getSellArmors()).find((x) => x.id === input.armoryItemId)

        if (!armoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryArmor?.price ?? 0)

        await db.$transaction(async (db) => {
          const armorToDelete = await db.armorInInventory.findFirst({
            where: {
              inventory_id: (await InventoryAction.get()).id,
              armor_id: armoryArmor.armor_id,
            },
          })

          if (!armorToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

          await db.armorInInventory.delete({
            where: {
              id: armorToDelete.id,
            },
          })

          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })
        })

        break
      }
    }
  })
