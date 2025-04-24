import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as HospitalAction from '@/app/actions/hospital'

import { QUERY_KEY } from '@/config'

const _useHospitalShowQuery = createQueryHook([QUERY_KEY.HOSPITAL], HospitalAction.show)

export type HospitalPotion = NonNullable<ReturnType<typeof _useHospitalShowQuery>['data']>['potions_hospital'][0]

export function useHospitalShowQuery(...p: Parameters<typeof _useHospitalShowQuery>) {
  const hospitalShowQuery = _useHospitalShowQuery(...p)

  return {
    ...hospitalShowQuery,
    derived: {
      hasBuyPotions: !!hospitalShowQuery.data?.potions_hospital,
    },
  }
}

export const useHospitalResurectMutation = createMutationHook(HospitalAction.resurrect, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.GAME_INFO,
  QUERY_KEY.HOSPITAL,
])
export const useHospitalHealMutation = createMutationHook(HospitalAction.heal, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])

export const useHospitalBuyPotionMutation = createMutationHook(HospitalAction.buyPotion, [QUERY_KEY.PLAYER])

export const useHospitalAcceptEnemySlainQuestMutation = createMutationHook(HospitalAction.acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
  QUERY_KEY.QUEST_ASSIGNED,
])
export const useHospitalCompleteEnemySlainQuestMutation = createMutationHook(HospitalAction.completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
  QUERY_KEY.QUEST_ASSIGNED,
])
