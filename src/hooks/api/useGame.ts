import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'

import * as GameAction from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export const useShowInfoQuery = createQueryHook([QUERY_KEY.INFO], GameAction.showInfo)

export const useAttackMutation = createMutationHook(GameAction.attack, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INFO,
])

export const useRunAwayMutation = createMutationHook(GameAction.runAway, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INFO,
])

export const useLootMutation = createMutationHook(GameAction.loot, [QUERY_KEY.PLAYER, QUERY_KEY.INFO])
