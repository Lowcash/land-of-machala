import 'server-only'

import { db } from '@/lib/db'

import { getI18n as armorGetI18n } from '@/entity/armor'
import { getI18n as weaponGetI18n } from '@/entity/weapon'
import { getI18n as potionGetI18n } from '@/entity/potion'

export type InventoryEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(playerId: string, inventoryId: Nullish<string>) {
  const inventory = inventoryId
    ? await db.inventory.findFirst({
        where: { id: inventoryId },
        include: {
          weapons_inventory: { include: { weapon: true } },
          armors_inventory: { include: { armor: true } },
          potions_inventory: { include: { potion: true } },
        },
      })
    : await db.$transaction(async (db) => {
        const inventory = await db.inventory.create({
          data: {},
          include: {
            weapons_inventory: { include: { weapon: true } },
            armors_inventory: { include: { armor: true } },
            potions_inventory: { include: { potion: true } },
          },
        })

        await db.user.update({
          where: { id: playerId },
          data: { inventory: { connect: { id: inventory.id } } },
        })

        return inventory
      })

  if (!inventory) return undefined

  return {
    ...inventory,
    armors_inventory: inventory.armors_inventory.map((x) => ({
      ...x,
      armor: {
        ...x.armor,
        ...armorGetI18n(x.armor),
      },
    })),
    weapons_inventory: inventory.weapons_inventory.map((x) => ({
      ...x,
      weapon: {
        ...x.weapon,
        ...weaponGetI18n(x.weapon),
      },
    })),
    potions_inventory: inventory.potions_inventory.map((x) => ({
      ...x,
      potion: {
        ...x.potion,
        ...potionGetI18n(x.potion),
      },
    })),
  }
}
