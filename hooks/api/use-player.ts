import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import { showCreate, show, move } from '@/app/actions/player'

import { QUERY_KEY } from '@/config'

export const usePlayerShowCreateQuery = createQueryHook([QUERY_KEY.CREATE], showCreate)

export const usePlayerShowQuery = createQueryHook([QUERY_KEY.PLAYER], show)

export const usePlayerMoveMutation = createMutationHook(move, [QUERY_KEY.PLAYER, QUERY_KEY.STATS, QUERY_KEY.GAME_INFO])
