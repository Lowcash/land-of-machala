import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getPlayerSession, movePlayer } from '@/server/actions/player'
import { createPlayer, getPlayer } from '@/server/actions/player'

import { QUERY_KEY } from '@/const'

export function usePlayerSessionQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.PLAYER_SESSION],
    queryFn: () => getPlayerSession(),
  })
}

export function usePlayerQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.PLAYER],
    queryFn: () => getPlayer(),
  })
}

export function useCreatePlayerMutation() {
  return useMutation({
    mutationFn: createPlayer,
  })
}

export function usePlayerMoveMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: movePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY_KEY.PLAYER || p.queryKey[0] === QUERY_KEY.PLAYER_STATS,
      })
    },
  })
}
