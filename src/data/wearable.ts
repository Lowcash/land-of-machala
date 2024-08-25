import { useMutation, useQueryClient } from '@tanstack/react-query'
import { drink, unwear, wear } from '@/server/actions/wearable'

import { QUERY_KEY } from '@/const'

export function useWearMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: wear,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY_KEY.WEARABLE || p.queryKey[0] === QUERY_KEY.INVENTORY,
      })
    },
  })
}

export function useUnwearMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unwear,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY_KEY.WEARABLE || p.queryKey[0] === QUERY_KEY.INVENTORY,
      })
    },
  })
}

export function useDrinkMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: drink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY_KEY.WEARABLE || p.queryKey[0] === QUERY_KEY.INVENTORY,
      })
    },
  })
}
