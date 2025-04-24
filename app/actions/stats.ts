'use server'

import i18n from '@/lib/i18n'
import { playerActionClient } from '@/lib/safe-action'

import * as StatsEntity from '@/entity/stats'
import * as WearableEntity from '@/entity/wearable'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient.metadata({ actionName: 'stats_show' }).action(async ({ ctx }) => {
  const wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

  if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const stats = await StatsEntity.get(ctx.player, wearable)

  return {
    ...stats,
    text: {
      header: i18n.t('stats.header'),
      level: i18n.t('stats.level'),
      damage: i18n.t('stats.damage'),
      strength: i18n.t('stats.strength'),
      agility: i18n.t('stats.agility'),
      intelligence: i18n.t('stats.intelligence'),
    },
  }
})
