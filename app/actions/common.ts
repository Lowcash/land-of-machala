'use server'

import i18n from '@/lib/i18n'
import type { Route } from '@/types'
import { cookies } from 'next/headers'
import { actionClient } from '@/lib/safe-action'

import { PAGE_COOKIE_KEY } from '@/config'

export const show = actionClient.metadata({ actionName: 'common_show' }).action(async () => {
  return {
    text: {
      worldExplore: i18n.t('common.world_explore'),
      worldBack: i18n.t('common.world_back'),
      back: i18n.t('common.back'),
      leave: i18n.t('common.leave'),
      cityBack: i18n.t('common.city_back'),
      cityLeave: i18n.t('common.city_leave'),
      cityEnter: i18n.t('common.city_enter'),
      buy: i18n.t('action.buy'),
      sell: i18n.t('action.sell'),
      deposit: i18n.t('place.bank.deposit'),
      withdraw: i18n.t('place.bank.withdraw'),
      armor: i18n.t('armor.header'),
      weapon: i18n.t('weapon.header'),
      price: i18n.t('common.price'),
      damage: i18n.t('stats.damage'),
      stregth: i18n.t('stats.strength'),
      agility: i18n.t('stats.agility'),
      intelligence: i18n.t('stats.intelligence'),
      efficiency: i18n.t('potion.efficiency'),
      questHeader: i18n.t('quest.header_multi'),
      questEmpty: i18n.t('quest.empty'),
    },
  }
})

export const getPage = async () => ((await cookies()).get(PAGE_COOKIE_KEY)?.value as Route) || 'WORLD'
