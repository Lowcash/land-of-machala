'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getPlayerSession, movePlayer } from '@/server/actions/player'
import { createPlayer, getPlayer } from '@/server/actions/player'

export const PLAYER_SESSION_KEY = 'gplayer-session-key'
export const PLAYER_KEY = 'player-key'

export function usePlayerSessionQuery() {
  return useQuery({
    queryKey: [PLAYER_SESSION_KEY],
    queryFn: () => getPlayerSession(),
  })
}

export function usePlayerQuery() {
  return useQuery({
    queryKey: [PLAYER_KEY],
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
        predicate: (p) => p.queryKey[0] === PLAYER_KEY,
      })
    },
  })
}
