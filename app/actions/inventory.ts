'use server'

import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { playerProcedure } from '@/lib/safe-action'

import * as InventoryEntity from '@/entity/inventory'
import * as WearableEntity from '@/entity/wearable'

import { ERROR_CAUSE } from '@/config'

export const show = playerProcedure.createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const t = await getTranslations()

    const [inventory, wearable] = await Promise.all([
      InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
      WearableEntity.get(ctx.player, ctx.player.wearable_id),
    ])
    if (!inventory || !wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      weapons: inventory.weapons_inventory?.map((x) => {
        const armed = Object.entries(wearable).find(([, v]) => v === x.id)

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
          gain: `+${x.potion.hp_gain} ${t('common.hp')}`,
        },
      })),
      text: {
        header: t('inventory.header'),
        content: t('inventory.content'),
        empty: t('inventory.empty'),
        weapon: t('weapon.header'),
        weapon_multi: t('weapon.header_multi'),
        left_hand: t('weapon.left_hand'),
        right_hand: t('weapon.right_hand'),
        armor: t('armor.header'),
        armor_multi: t('armor.header_multi'),
        potion_multi: t('potion.header_multi'),
        damage: t('stats.damage'),
        stregth: t('stats.strength'),
        agility: t('stats.agility'),
        intelligence: t('stats.intelligence'),
        wear: t('action.wear'),
        use: t('action.use'),
        efficiency: t('potion.efficiency'),
      },
    }
  })
