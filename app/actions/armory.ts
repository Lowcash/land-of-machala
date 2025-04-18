'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { authActionClient, handleValidationErrorsShape } from '@/lib/safe-action'
import { type InferSafeActionFnResult } from 'next-safe-action'
import { armoryItemActionSchema, armorySchema } from '@/zod-schema/armory'
import type { Armor, Weapon } from '@prisma/client'

import * as ArmorAction from './armor'
import * as WeaponAction from './weapon'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE } from '@/config'

export const show = authActionClient
  .metadata({ actionName: 'armory_show' })
  .schema(armorySchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }) => {
    const [armory, inventory, weaponsAll, armorsAll] = await Promise.all([
      get({ armoryId: parsedInput.armoryId }).then((x) => x?.data),
      InventoryAction.get().then((x) => x?.data),
      WeaponAction.getAll().then((x) => x?.data),
      ArmorAction.getAll().then((x) => x?.data),
    ])

    if (!armory || !inventory || !weaponsAll || !armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      buyWeapons: getBuyWeapons({ weaponsAll, armory }),
      buyArmors: getBuyArmors({ armorsAll, armory }),
      sellWeapons: getSellWeapons({ weaponsAll, inventory }),
      sellArmors: getSellArmors({ armorsAll, inventory }),
      text: {
        header: `${i18n.t('place.your_are_in')} <b>${armory.name}</b>`,
        description: armory.description,
        buySuccess: i18n.t(`${armory.i18n_key}.buy_success` as any),
        buyFailed: i18n.t(`${armory.i18n_key}.buy_failed` as any),
      },
    }
  })

export type ArmoryGetResult = InferSafeActionFnResult<typeof get>['data']

export const get = authActionClient
  .metadata({ actionName: 'armory_get' })
  .schema(armorySchema)
  .action(async ({ parsedInput }) => {
    const armory = await db.armory.findFirst({
      where: { id: parsedInput.armoryId },
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
      },
    })

    if (!armory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...armory,
      name: i18n.t(`${armory.i18n_key}.header` as any),
      description: i18n.t(`${armory.i18n_key}.description` as any),
    }
  })

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

function getBuyWeapons(args: { weaponsAll: Weapon[]; armory: ArmoryGetResult }) {
  const spreadBuyPriceWeapons = spreadItemsPrices(
    args.weaponsAll,
    { min: BUY_MIN_PRICE, max: BUY_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.armory?.weapons.map((x) => ({
    itemId: x.id,
    weapon_id: x.weapon_id,
    name: x.weapon.i18n_key,
    damage_from: x.weapon.damage_from,
    damage_to: x.weapon.damage_to,
    price: spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

function getSellWeapons(args: { weaponsAll: Weapon[]; inventory: InventoryAction.InventoryGetResult }) {
  const spreadSellPriceWeapons = spreadItemsPrices(
    args.weaponsAll,
    { min: SELL_MIN_PRICE, max: SELL_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.inventory?.weapons_inventory.map((x) => ({
    itemId: x.id,
    weapon_id: x.weapon_id,
    name: x.weapon.i18n_key,
    damage_from: x.weapon.damage_from,
    damage_to: x.weapon.damage_to,
    price: spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

function getBuyArmors(args: { armorsAll: Armor[]; armory: ArmoryGetResult }) {
  const spreadBuyPriceArmors = spreadItemsPrices(
    args.armorsAll,
    { min: BUY_MIN_PRICE, max: BUY_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.armory?.armors.map((x) => ({
    itemId: x.id,
    armor_id: x.armor_id,
    name: x.armor.i18n_key,
    type: x.armor.type,
    armor: x.armor.armor,
    strength: x.armor.strength,
    agility: x.armor.agility,
    intelligence: x.armor.intelligence,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

function getSellArmors(args: { armorsAll: Armor[]; inventory: InventoryAction.InventoryGetResult }) {
  const spreadSellPriceArmors = spreadItemsPrices(
    args.armorsAll,
    { min: SELL_MIN_PRICE, max: SELL_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.inventory?.armors_inventory.map((x) => ({
    itemId: x.id,
    armor_id: x.armor_id,
    name: x.armor.i18n_key,
    type: x.armor.type,
    armor: x.armor.armor,
    strength: x.armor.strength,
    agility: x.armor.agility,
    intelligence: x.armor.intelligence,
    price: spreadSellPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

function spreadItemsPrices<T extends { id: string | number }>(
  sortedItemsAsc: T[],
  price: { min: number; max: number },
  opt?: { roundBy?: number },
) {
  const roundBy = opt?.roundBy ?? 1

  const priceStep = (price.max - price.min) / (sortedItemsAsc.length ?? 0)

  return sortedItemsAsc.map((x, idx) => ({
    id: x.id,
    price: Math.round((price.min + (idx + 1) * priceStep) / roundBy) * roundBy,
  }))
}

export const buyItem = authActionClient
  .metadata({ actionName: 'armory_buyItem' })
  .schema(armoryItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [armory, inventory] = await Promise.all([
      get({ armoryId: parsedInput.armoryId }).then((x) => x?.data),
      InventoryAction.get().then((x) => x?.data),
    ])

    if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (parsedInput.armoryItemType) {
      case 'weapon': {
        const weaponsAll = (await WeaponAction.getAll())?.data

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryBuyWeapon = (await getBuyWeapons({ weaponsAll, armory }))?.find(
          (x) => x.itemId === parsedInput.armoryItemId,
        )

        if (!armoryBuyWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money - (armoryBuyWeapon?.price ?? 0)

        if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })

          await db.weaponInInventory.create({
            data: {
              weapon_id: armoryBuyWeapon.weapon_id,
              inventory_id: inventory.id,
            },
          })
        })

        break
      }
      case 'armor': {
        const armorsAll = (await ArmorAction.getAll())?.data

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = (await getBuyArmors({ armorsAll, armory }))?.find(
          (x) => x.itemId === parsedInput.armoryItemId,
        )

        if (!armoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money - (armoryArmor?.price ?? 0)

        if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })

          await db.armorInInventory.create({
            data: {
              armor_id: armoryArmor.armor_id,
              inventory_id: inventory.id,
            },
          })
        })

        break
      }
    }
  })

export const sellItem = authActionClient
  .metadata({ actionName: 'armory_sellItem' })
  .schema(armoryItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const inventory = (await InventoryAction.get())?.data

    if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (parsedInput.armoryItemType) {
      case 'weapon': {
        const weaponsAll = (await WeaponAction.getAll())?.data

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armorySellWeapon = (await getSellWeapons({ weaponsAll, inventory }))?.find(
          (x) => x.itemId === parsedInput.armoryItemId,
        )

        if (!armorySellWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money + (armorySellWeapon?.price ?? 0)

        await db.$transaction(async (db) => {
          const weaponToDelete = await db.weaponInInventory.findFirst({
            where: {
              inventory_id: inventory.id,
              weapon_id: armorySellWeapon.weapon_id,
            },
          })

          if (!weaponToDelete) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.weaponInInventory.delete({
            where: {
              id: weaponToDelete.id,
            },
          })

          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })
        })

        break
      }
      case 'armor': {
        const armorsAll = (await ArmorAction.getAll())?.data

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = (await getSellArmors({ armorsAll, inventory }))?.find(
          (x) => x.itemId === parsedInput.armoryItemId,
        )

        if (!armoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money + (armoryArmor?.price ?? 0)

        await db.$transaction(async (db) => {
          const armorToDelete = await db.armorInInventory.findFirst({
            where: {
              inventory_id: inventory.id,
              armor_id: armoryArmor.armor_id,
            },
          })

          if (!armorToDelete) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.armorInInventory.delete({
            where: {
              id: armorToDelete.id,
            },
          })

          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })
        })

        break
      }
    }
  })
