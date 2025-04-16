import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as HospitalAction from '@/app/actions/hospital'

import { QUERY_KEY } from '@/config'

export const useHospitalQuery = createQueryHook([QUERY_KEY.HOSPITAL], HospitalAction.show)

export const useHospitalHealMutation = createMutationHook(HospitalAction.heal, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])
export const useHospitalResurectMutation = createMutationHook(HospitalAction.resurect, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.GAME_INFO,
  QUERY_KEY.HOSPITAL,
])

export const useHospitalBuyPotionMutation = createMutationHook(HospitalAction.buyPotion, [QUERY_KEY.PLAYER])

export const useHospitalAcceptEnemySlainQuestMutation = createMutationHook(HospitalAction.acceptSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
export const useHospitalCompleteEnemySlainQuestMutation = createMutationHook(HospitalAction.completeSlainEnemyQuest, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.HOSPITAL,
])
