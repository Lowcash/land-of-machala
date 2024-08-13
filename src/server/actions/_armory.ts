import { getArmors } from './armor'
import { getWeapons } from './weapon'
import { getArmory } from './armory'
import { getInventory } from './inventory'

const BUY_MIN_PRICE = 1000
const BUY_MAX_PRICE = 50000
const SELL_MIN_PRICE = 200 // divided by 5
const SELL_MAX_PRICE = 10000 // divided by 5

const ROUND_PRICE_BY = 100

export async function getBuyWeapons(args: { armoryId: string }) {
  const armory = await getArmory({ armoryId: args.armoryId })
  const weapons = await getWeapons()

  const spreadBuyPriceWeapons = spreadItemsPrices(weapons, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.weapons.map((x) => ({
    ...x,
    price: spreadBuyPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

export async function getSellWeapons() {
  const inventory = await getInventory()
  const weapons = await getWeapons()

  const spreadSellPriceWeapons = spreadItemsPrices(weapons!, SELL_MIN_PRICE, SELL_MAX_PRICE, {
    roundBy: ROUND_PRICE_BY,
  })

  return inventory.weapons_inventory.map((x) => ({
    ...x,
    price: spreadSellPriceWeapons.find((y) => y.id === x.weapon_id)?.price ?? 0,
  }))
}

export async function getBuyArmors(args: { armoryId: string }) {
  const armory = await getArmory({ armoryId: args.armoryId })
  const armors = await getArmors()

  const spreadBuyPriceArmors = spreadItemsPrices(armors!, BUY_MIN_PRICE, BUY_MAX_PRICE, { roundBy: ROUND_PRICE_BY })

  return armory.armors.map((x) => ({
    ...x,
    price: spreadBuyPriceArmors.find((y) => y.id === x.armor_id)?.price ?? 0,
  }))
}

export async function getSellArmors() {
  const inventory = await getInventory()
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
