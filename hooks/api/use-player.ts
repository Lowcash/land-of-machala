import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as UserAction from '@/app/actions/user'
import * as PlayerAction from '@/app/actions/player'
import * as StatsAction from '@/app/actions/stats'

import { QUERY_KEY } from '@/config'

export const useShowLandingQuery = createQueryHook([QUERY_KEY.LANDING], UserAction.showLanding)

export const useShowCreateQuery = createQueryHook([QUERY_KEY.CREATE], UserAction.showCreate)

export const usePlayerShowQuery = createQueryHook([QUERY_KEY.PLAYER], PlayerAction.show)
export const useStatsShowQuery = createQueryHook([QUERY_KEY.STATS], StatsAction.show)

export const usePlayerMoveMutation = createMutationHook(PlayerAction.move, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.GAME_INFO,
])
