import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import {
  buyPotion,
  heal,
  resurect,
  show,
  acceptSlainEnemyQuest,
  completeSlainEnemyQuest,
} from '@/server/actions/hospital'

import { QUERY_KEY } from '@/const'

export const useHospitalQuery = createQueryHook([QUERY_KEY.HOSPITAL], show)

export const useHealMutation = createMutationHook(heal, [QUERY_KEY.PLAYER, QUERY_KEY.INFO])
export const useResurectMutation = createMutationHook(resurect, [QUERY_KEY.PLAYER, QUERY_KEY.HOSPITAL])

export const useBuyPotionMutation = createMutationHook(buyPotion, [QUERY_KEY.PLAYER])

export const useAcceptEnemySlainQuestMutation = createMutationHook(acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
export const useCompleteEnemySlainQuestMutation = createMutationHook(completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
