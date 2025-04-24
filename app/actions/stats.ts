'use server'

import i18n from '@/lib/i18n'
import { playerActionClient } from '@/lib/safe-action'

import * as StatsEntity from '@/entity/stats'

export const show = playerActionClient.metadata({ actionName: 'stats_show' }).action(async ({ ctx }) => {
  const stats = await StatsEntity.get(ctx.player.id, ctx.player.wearable_id)

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
