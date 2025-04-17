'use server'

import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type InferSafeActionFnResult } from 'next-safe-action'

import * as WearableAction from './wearable'

import { ERROR_CAUSE } from '@/config'

export const get = authActionClient.metadata({ actionName: 'inventory_get' }).action(async ({ ctx }) => {
  const inventory = ctx.user.inventory_id
    ? await db.inventory.findFirst({
        where: { id: ctx.user.inventory_id },
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
          where: { id: ctx.user.id },
          data: { inventory: { connect: { id: inventory.id } } },
        })

        return inventory
      })

  if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  return inventory
})

export type InventoryGetResult = InferSafeActionFnResult<typeof get>['data']

export const show = authActionClient.metadata({ actionName: 'inventory_show' }).action(async () => {
  const [inventory, wearable] = await Promise.all([
    get().then((x) => x?.data),
    WearableAction.get().then((x) => x?.data),
  ])
  if (!inventory || !wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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
    potions: inventory.potions_inventory.sort((a, b) => (a.potion.hp_gain ?? 0) - (b.potion.hp_gain ?? 0)),
  }
})
