'use server'

import { getTranslations } from 'next-intl/server'
import type { Route } from '@/types'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createServerAction } from 'zsa'

import { PAGE_COOKIE_KEY } from '@/config'

export const show = createServerAction()
  .input(z.object({}).optional())
  .handler(async () => {
    const t = await getTranslations()

    return {
      text: {
        worldExplore: t('common.world_explore'),
        worldBack: t('common.world_back'),
        back: t('common.back'),
        leave: t('common.leave'),
        cityBack: t('common.city_back'),
        cityLeave: t('common.city_leave'),
        cityEnter: t('common.city_enter'),
        buy: t('action.buy'),
        sell: t('action.sell'),
        deposit: t('place.bank.deposit'),
        withdraw: t('place.bank.withdraw'),
        armor: t('armor.header'),
        weapon: t('weapon.header'),
        price: t('common.price'),
        damage: t('stats.damage'),
        stregth: t('stats.strength'),
        agility: t('stats.agility'),
        intelligence: t('stats.intelligence'),
        efficiency: t('potion.efficiency'),
        questHeader: t('quest.header_multi'),
        questEmpty: t('quest.empty'),
      },
    }
  })

export const getPage = async () => ((await cookies()).get(PAGE_COOKIE_KEY)?.value as Route) || 'WORLD'
