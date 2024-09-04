import { useMutation, useQueryClient } from '@tanstack/react-query'
import { attack, loot, runAway } from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export function useAttackMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: attack,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) =>
          p.queryKey[0] === QUERY_KEY.PLAYER ||
          p.queryKey[0] === QUERY_KEY.PLAYER_STATS ||
          p.queryKey[0] === QUERY_KEY.WEARABLE,
      })
    },
  })
}

export function useRunAwayMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: runAway,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) =>
          p.queryKey[0] === QUERY_KEY.PLAYER ||
          p.queryKey[0] === QUERY_KEY.PLAYER_STATS ||
          p.queryKey[0] === QUERY_KEY.WEARABLE,
      })
    },
  })
}

export function useLootMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loot,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY_KEY.PLAYER,
      })
    },
  })
}
