import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { attack, getInfo, loot, runAway } from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export const useInfoQuery = createQueryHook([QUERY_KEY.INFO], getInfo)

export const useAttackMutation = createMutationHook(attack, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
])

export const useRunAwayMutation = createMutationHook(runAway, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
])

export const useLootMutation = createMutationHook(loot, [QUERY_KEY.PLAYER])
