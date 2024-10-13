import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import {
  buy,
  heal,
  resurect,
  getHospital,
  acceptSlainEnemyQuest,
  completeSlainEnemyQuest,
} from '@/server/actions/hospital'

import { QUERY_KEY } from '@/const'

export const useHospitalQuery = createQueryHook([QUERY_KEY.HOSPITAL], getHospital)

export const useHealMutation = createMutationHook(heal, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])
export const useResurectMutation = createMutationHook(resurect, [QUERY_KEY.PLAYER])

export const useBuyMutation = createMutationHook(buy, [QUERY_KEY.PLAYER])

export const useAcceptEnemySlainQuestMutation = createMutationHook(acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
export const useCompleteEnemySlainQuestMutation = createMutationHook(completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
