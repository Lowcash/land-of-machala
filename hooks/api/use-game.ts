import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import { showInfo, attack, runAway, loot } from '@/app/actions/game'

import { QUERY_KEY } from '@/config'

const _useGameInfoShowQuery = createQueryHook([QUERY_KEY.GAME_INFO], showInfo)

export function useGameShowInfoQuery() {
  const gameInfoShowQuery = _useGameInfoShowQuery()

  return {
    ...gameInfoShowQuery,
    derived: {
      hasPlace: !!gameInfoShowQuery.data?.place,
      hasSubplace: !!gameInfoShowQuery.data?.place?.subplaces.length,
      hasCombat: !!gameInfoShowQuery.data?.combat,
      hasDefeated: !!gameInfoShowQuery.data?.player.defeated,
      hasLoot: !!gameInfoShowQuery.data?.loot,
    },
  }
}

export const useGameAttackMutation = createMutationHook(attack, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.GAME_INFO,
  QUERY_KEY.QUEST_ASSIGNED,
])

export const useGameRunawayMutation = createMutationHook(runAway, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])

export const useGameCollectMutation = createMutationHook(loot, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.INVENTORY,
  QUERY_KEY.GAME_INFO,
])

export const useGameRunAwayMutation = createMutationHook(runAway, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.GAME_INFO,
])

export const useGameLootMutation = createMutationHook(loot, [QUERY_KEY.PLAYER, QUERY_KEY.GAME_INFO])
