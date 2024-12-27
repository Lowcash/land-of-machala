import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as PlayerAction from '@/server/actions/player'
import * as StatsAction from '@/server/actions/stats'

import { QUERY_KEY } from '@/const'

export const usePlayerSessionQuery = createQueryHook([QUERY_KEY.SESSION], PlayerAction.getSession)

export const usePlayerQuery = createQueryHook([QUERY_KEY.PLAYER], PlayerAction.get)
export const usePlayerStatsQuery = createQueryHook([QUERY_KEY.STATS], StatsAction.get)

export const useCreatePlayerMutation = createMutationHook(PlayerAction.create)

export const usePlayerMoveMutation = createMutationHook(PlayerAction.move, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.INFO,
])
