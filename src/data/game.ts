import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { attack, getGameInfo, loot, runAway } from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export const useGameInfoQuery = createQueryHook([QUERY_KEY.GAME_INFO], getGameInfo)

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
