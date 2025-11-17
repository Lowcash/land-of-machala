import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import {
  show,
  resurrect,
  heal,
  buyPotion,
} from '@/app/actions/hospital'
import {
  acceptSlainEnemyQuest,
  completeSlainEnemyQuest,
} from '@/app/actions/quest'

import { QUERY_KEY } from '@/config'

const _useHospitalShowQuery = createQueryHook([QUERY_KEY.HOSPITAL], show)

export type HospitalPotion = NonNullable<ReturnType<typeof _useHospitalShowQuery>['data']>['potions_hospital'][0]

export function useHospitalShowQuery(...p: Parameters<typeof _useHospitalShowQuery>) {
  const hospitalShowQuery = _useHospitalShowQuery(...p)

  return {
    ...hospitalShowQuery,
    derived: {
      hasBuyPotions: !!hospitalShowQuery.data?.potions_hospital.length,
    },
  }
}

export const useHospitalResurectMutation = createMutationHook(resurrect, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.GAME_INFO,
  QUERY_KEY.HOSPITAL,
])
export const useHospitalHealMutation = createMutationHook(heal, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])

export const useHospitalBuyPotionMutation = createMutationHook(buyPotion, [QUERY_KEY.PLAYER, QUERY_KEY.INVENTORY])

export const useHospitalAcceptEnemySlainQuestMutation = createMutationHook(acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
  QUERY_KEY.QUEST_ASSIGNED,
])
export const useHospitalCompleteEnemySlainQuestMutation = createMutationHook(completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
  QUERY_KEY.QUEST_ASSIGNED,
])
