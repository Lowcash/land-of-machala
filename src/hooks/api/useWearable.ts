import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { drink, getWearable, unwear, wear } from '@/server/actions/wearable'

import { QUERY_KEY } from '@/const'

export const useWearableQuery = createQueryHook([QUERY_KEY.WEARABLE], getWearable)

export const useWearMutation = createMutationHook(wear, [
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
export const useUnwearMutation = createMutationHook(unwear, [
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])

export const useDrinkMutation = createMutationHook(drink, [QUERY_KEY.WEARABLE, QUERY_KEY.INVENTORY])
