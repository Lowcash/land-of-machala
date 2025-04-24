import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as GameAction from '@/app/actions/game'

import { QUERY_KEY } from '@/config'

const _useGameInfoShowQuery = createQueryHook([QUERY_KEY.GAME_INFO], GameAction.showInfo)

export function useGameShowInfoQuery() {
  const gameInfoShowQuery = _useGameInfoShowQuery()

  return {
    ...gameInfoShowQuery,
    derived: {
      hasPlace: !!gameInfoShowQuery.data?.place,
      hasSubplace: (gameInfoShowQuery.data?.place?.subplaces.length ?? 0) > 0,
      hasCombat: !!gameInfoShowQuery.data?.combat,
      hasDefeated: !!gameInfoShowQuery.data?.player.defeated,
      hasLoot: !!gameInfoShowQuery.data?.loot,
    },
  }
}

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
