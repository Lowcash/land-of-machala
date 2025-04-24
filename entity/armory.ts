import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Armor, Armory, Weapon } from '@prisma/client'

import * as ArmorEntity from '@/entity/armor'
import * as WeaponEntity from '@/entity/weapon'
import * as InventoryEntity from '@/entity/inventory'

import { ERROR_CAUSE } from '@/config'

type _ArmoryEntity = NonNullable<Awaited<ReturnType<typeof _get>>>

async function _get(id: string) {
  const armory = await db.armory.findFirst({
    where: { id },
    include: {
      weapons: { include: { weapon: true } },
      armors: { include: { armor: true } },
    },
  })

  if (!armory) return undefined

  return {
    ...armory,
    ...getI18n(armory),
    armors: armory.armors.map((x) => ({
      ...x,
      armor: { ...x.armor, ...ArmorEntity.getI18n(x.armor) },
    })),
    weapons: armory.weapons.map((x) => ({
      ...x,
      weapon: { ...x.weapon, ...WeaponEntity.getI18n(x.weapon) },
    })),
  }
}

export type ArmoryEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(armoryId: string, playerId: string, inventoryId: Nullish<string>) {
  const [armory, inventory] = await Promise.all([_get(armoryId), InventoryEntity.get(playerId, inventoryId)])

  if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const [armorsAll, weaponsAll] = await Promise.all([ArmorEntity.getAll(), WeaponEntity.getAll()])

  return {
    ...armory,
    buyArmors: getBuyArmors({ armorsAll, armory }),
    buyWeapons: getBuyWeapons({ weaponsAll, armory }),
    sellArmors: getSellArmors({ armorsAll, inventory }),
    sellWeapons: getSellWeapons({ weaponsAll, inventory }),
  }
}

export function getI18n(entity: Armory) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

function getBuyArmors(args: { armorsAll: Armor[]; armory: _ArmoryEntity }) {
  const spreadBuyPriceArmors = spreadItemsPrices(
    args.armorsAll,
    { min: BUY_MIN_PRICE, max: BUY_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.armory?.armors.map((x) => {
    const price = spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0

    return {
      itemId: x.id,
      armor_id: x.armor_id,
      name: x.armor.name,
      type: x.armor.type,
      armor: x.armor.armor,
      strength: x.armor.strength,
      agility: x.armor.agility,
      intelligence: x.armor.intelligence,
      price,
      text: {
        price: `${price} ${i18n.t('common.currency')}`,
      },
    }
  })
}

function getBuyWeapons(args: { weaponsAll: Weapon[]; armory: _ArmoryEntity }) {
  const spreadBuyPriceWeapons = spreadItemsPrices(
    args.weaponsAll,
    { min: BUY_MIN_PRICE, max: BUY_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.armory?.weapons.map((x) => {
    const price = spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0

    return {
      itemId: x.id,
      weapon_id: x.weapon_id,
      name: x.weapon.name,
      damage_from: x.weapon.damage_from,
      damage_to: x.weapon.damage_to,
      price,
      text: {
        price: `${price} ${i18n.t('common.currency')}`,
      },
    }
  })
}

function getSellArmors(args: { armorsAll: Armor[]; inventory: InventoryEntity.InventoryEntity }) {
  const spreadSellPriceArmors = spreadItemsPrices(
    args.armorsAll,
    { min: SELL_MIN_PRICE, max: SELL_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.inventory?.armors_inventory.map((x) => {
    const price = spreadSellPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0

    return {
      itemId: x.id,
      armor_id: x.armor_id,
      name: x.armor.name,
      type: x.armor.type,
      armor: x.armor.armor,
      strength: x.armor.strength,
      agility: x.armor.agility,
      intelligence: x.armor.intelligence,
      price,
      text: {
        price: `${price} ${i18n.t('common.currency')}`,
      },
    }
  })
}

function getSellWeapons(args: { weaponsAll: Weapon[]; inventory: InventoryEntity.InventoryEntity }) {
  const spreadSellPriceWeapons = spreadItemsPrices(
    args.weaponsAll,
    { min: SELL_MIN_PRICE, max: SELL_MAX_PRICE },
    { roundBy: ROUND_PRICE_BY },
  )

  return args.inventory?.weapons_inventory.map((x) => {
    const price = spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0

    return {
      itemId: x.id,
      weapon_id: x.weapon_id,
      name: x.weapon.name,
      damage_from: x.weapon.damage_from,
      damage_to: x.weapon.damage_to,
      price,
      text: {
        price: `${price} ${i18n.t('common.currency')}`,
      },
    }
  })
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
