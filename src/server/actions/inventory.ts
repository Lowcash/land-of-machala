'use server'

import { protectedAction } from '@/server/trpc'
import * as _Inventory from './_inventory'
import * as PlayerAction from './player'
import * as WearableAction from './wearable'

export const get = protectedAction.query(async () => {
  const player = await PlayerAction.get()

  return await _Inventory.get(player.id, player.inventory_id)
})

export const show = protectedAction.query(async () => {
  try {
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
  } catch(err) {
    throw err
  }
})
