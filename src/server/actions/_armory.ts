import * as ArmoryAction from './armory'
import * as ArmorAction from './armor'
import * as WeaponAction from './weapon'
import * as InventoryAction from './inventory'

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

export async function getBuyWeapons(args: { armoryId: string }) {
  const armory = await ArmoryAction.getArmory({ armoryId: args.armoryId })
  const weapons = await WeaponAction.getAll()

  const spreadBuyPriceWeapons = spreadItemsPrices(weapons, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.weapons.map((x) => ({
    ...x,
    price: spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

export async function getSellWeapons() {
  const inventory = await InventoryAction.get()
  const weapons = await WeaponAction.getAll()

  const spreadSellPriceWeapons = spreadItemsPrices(weapons!, SELL_MIN_PRICE, SELL_MAX_PRICE, {
    roundBy: ROUND_PRICE_BY,
  })

  return inventory.weapons_inventory.map((x) => ({
    ...x,
    price: spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

export async function getBuyArmors(args: { armoryId: string }) {
  const armory = await ArmoryAction.getArmory({ armoryId: args.armoryId })
  const armors = await ArmorAction.getAll()

  const spreadBuyPriceArmors = spreadItemsPrices(armors!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.armors.map((x) => ({
    ...x,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

export async function getSellArmors() {
  const inventory = await InventoryAction.get()
  const armors = await ArmorAction.getAll()

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
