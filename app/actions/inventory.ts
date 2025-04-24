'use server'

import i18n from '@/lib/i18n'
import { playerActionClient } from '@/lib/safe-action'

import * as InventoryEntity from '@/entity/inventory'
import * as WearableEntity from '@/entity/wearable'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient.metadata({ actionName: 'inventory_show' }).action(async ({ ctx }) => {
  const [inventory, wearable] = await Promise.all([
    InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
    WearableEntity.get(ctx.player, ctx.player.wearable_id),
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
