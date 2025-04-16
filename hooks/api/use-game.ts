import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as GameAction from '@/app/actions/game'

import { QUERY_KEY } from '@/config'

export const useGameInfoQuery = createQueryHook([QUERY_KEY.GAME_INFO], GameAction.info)

export const useGameAttackMutation = createMutationHook(GameAction.attack, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.GAME_INFO,
])

export const useGameRunAwayMutation = createMutationHook(GameAction.runAway, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.GAME_INFO,
])

export const useGameLootMutation = createMutationHook(GameAction.loot, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])
