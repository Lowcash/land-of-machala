import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'

import * as HospitalAction from '@/server/actions/hospital'

import { QUERY_KEY } from '@/const'

export const useHospitalQuery = createQueryHook([QUERY_KEY.HOSPITAL], HospitalAction.show)

export const useHealMutation = createMutationHook(HospitalAction.heal, [QUERY_KEY.PLAYER, QUERY_KEY.INFO])
export const useResurectMutation = createMutationHook(HospitalAction.resurect, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.INFO,
  QUERY_KEY.HOSPITAL,
])

export const useBuyPotionMutation = createMutationHook(HospitalAction.buyPotion, [QUERY_KEY.PLAYER])

export const useAcceptEnemySlainQuestMutation = createMutationHook(HospitalAction.acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
export const useCompleteEnemySlainQuestMutation = createMutationHook(HospitalAction.completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
