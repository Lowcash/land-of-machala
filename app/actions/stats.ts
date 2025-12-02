'use server'

import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { playerProcedure } from '@/lib/safe-action'

import { get as getWearable } from '@/entity/wearable'
import { get as getStats } from '@/entity/stats'

import { ERROR_CAUSE } from '@/config'

export const show = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const t = await getTranslations()

    const wearable = await getWearable(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const stats = await getStats(ctx.player, wearable)

    return {
      ...stats,
      text: {
        header: t('stats.header'),
        level: t('stats.level'),
        damage: t('stats.damage'),
        strength: t('stats.strength'),
        agility: t('stats.agility'),
        intelligence: t('stats.intelligence'),
      },
    }
  })
