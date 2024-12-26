import { db } from '@/server/db'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import { ERROR_CAUSE } from '@/const'

export async function get(playerId: string, inventoryId: string | null) {
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

  if (!inventory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return inventory
}
