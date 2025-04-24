import 'server-only'

import { db } from '@/lib/db'

import * as ArmorEntity from '@/entity/armor'
import * as PotionEntity from '@/entity/potion'
import * as WeaponEntity from '@/entity/weapon'

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
        ...ArmorEntity.getI18n(x.armor),
      },
    })),
    weapons_inventory: inventory.weapons_inventory.map((x) => ({
      ...x,
      weapon: {
        ...x.weapon,
        ...WeaponEntity.getI18n(x.weapon),
      },
    })),
    potions_inventory: inventory.potions_inventory.map((x) => ({
      ...x,
      potion: {
        ...x.potion,
        ...PotionEntity.getI18n(x.potion),
      },
    })),
  }
}
