import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { getPlayerSession, movePlayer } from '@/server/actions/player'
import { createPlayer, getPlayer, getPlayerStats } from '@/server/actions/player'

import { QUERY_KEY } from '@/const'

export const usePlayerSessionQuery = createQueryHook([QUERY_KEY.PLAYER_SESSION], getPlayerSession)

export const usePlayerQuery = createQueryHook([QUERY_KEY.PLAYER], getPlayer)
export const usePlayerStatsQuery = createQueryHook([QUERY_KEY.PLAYER_STATS], getPlayerStats)

export const useCreatePlayerMutation = createMutationHook(createPlayer)

export const usePlayerMoveMutation = createMutationHook(movePlayer, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.INFO,
])
