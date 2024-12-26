'use server'

import { db } from '@/server/db'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as PlayerAction from './player'
import * as WearableAction from './wearable'

import { ERROR_CAUSE } from '@/const'

export const get = protectedAction.query(async () => {
  const player = await PlayerAction.get()

  const inventory = player.inventory_id
    ? await db.inventory.findFirst({
        where: { id: player.inventory_id },
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
          where: { id: player.id },
          data: { inventory: { connect: { id: inventory.id } } },
        })

        return inventory
      })

  if (!inventory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return inventory
})

export const show = protectedAction.query(async () => {
  const [wearable, inventory] = await Promise.all([WearableAction.get(), get()])

  return {
    weapons: inventory.weapons_inventory?.map((x) => {
      const armed = Object.entries(wearable).find(([_, v]) => v === x.id)

      return {
        ...x,
        armed_left: armed?.[0] === 'left_hand_weapon_id',
        armed_right: armed?.[0] === 'right_hand_weapon_id',
      }
    }),
    armors: inventory.armors_inventory?.map((x) => ({
      ...x,
      armed: Object.values(wearable).some((y) => y === x.id),
    })),
    potions: inventory.potions_inventory.sort((a, b) => a.potion.hp_gain - b.potion.hp_gain),
  }
})
