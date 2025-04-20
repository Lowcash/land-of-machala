'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type InferSafeActionFnResult } from 'next-safe-action'

import * as WearableAction from './wearable'

import { ERROR_CAUSE } from '@/config'

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
    potions: inventory.potions_inventory.map((x) => ({
      ...x,
      text: {
        gain: `+${x.potion.hp_gain} ${i18n.t('common.hp')}`,
      },
    })),
    text: {
      header: i18n.t('inventory.header'),
      content: i18n.t('inventory.content'),
      empty: i18n.t('inventory.empty'),
      weapon: i18n.t('weapon.header'),
      weapon_multi: i18n.t('weapon.header_multi'),
      left_hand: i18n.t('weapon.left_hand'),
      right_hand: i18n.t('weapon.right_hand'),
      armor: i18n.t('armor.header'),
      armor_multi: i18n.t('armor.header_multi'),
      potion_multi: i18n.t('potion.header_multi'),
      damage: i18n.t('stats.damage'),
      stregth: i18n.t('stats.strength'),
      agility: i18n.t('stats.agility'),
      intelligence: i18n.t('stats.intelligence'),
      wear: i18n.t('action.wear'),
      use: i18n.t('action.use'),
      efficiency: i18n.t('potion.efficiency'),
    },
  }
})

export type InventoryGetResult = InferSafeActionFnResult<typeof get>['data']

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

  return {
    ...inventory,
    armors_inventory: inventory.armors_inventory.map((x) => ({
      ...x,
      armor: {
        ...x.armor,
        name: i18n.t(`${x.armor.i18n_key}.header` as any),
      },
    })),
    weapons_inventory: inventory.weapons_inventory.map((x) => ({
      ...x,
      weapon: {
        ...x.weapon,
        name: i18n.t(`${x.weapon.i18n_key}.header` as any),
      },
    })),
    potions_inventory: inventory.potions_inventory.map((x) => ({
      ...x,
      potion: {
        ...x.potion,
        name: i18n.t(`${x.potion.i18n_key}.header` as any),
      },
    })),
  }
})
