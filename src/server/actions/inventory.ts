'use server'

import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer } from './player'
import { getWearable } from './wearable'

import { ERROR_CAUSE } from '@/const'

export const getInventory = cache(
  protectedAction.query(async () => {
    const player = await getPlayer()
    const playerWithInventory = await db.user.update({
      where: { id: player.id },
      data: {
        inventory: {
          connectOrCreate: {
            where: { id: player.inventory_id || undefined },
            create: {},
          },
        },
      },
      include: {
        inventory: {
          include: {
            weapons_inventory: { include: { weapon: true } },
            armors_inventory: { include: { armor: true } },
            potions_inventory: { include: { potion: true } },
          },
        },
      },
    })

    if (!playerWithInventory.inventory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return playerWithInventory.inventory
  }),
)

export const showInventory = cache(
  protectedAction.query(async () => {
    const wearable = await getWearable()
    const inventory = await getInventory()

    const weapons = inventory.weapons_inventory?.map((x) => {
      const armed = Object.entries(wearable).find(([_, v]) => v === x.id)

      return {
        ...x,
        armed_left: armed?.[0] === 'left_hand_weapon_id',
        armed_right: armed?.[0] === 'right_hand_weapon_id',
      }
    })
    const armors = inventory.armors_inventory?.map((x) => ({
      ...x,
      armed: Object.values(wearable).some((y) => y === x.id),
    }))
    const potions = inventory.potions_inventory.sort((a, b) => a.potion.hp_gain - b.potion.hp_gain)

    return { weapons, armors, potions }
  }),
)
