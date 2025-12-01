import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import { show, wear, unwear, drink } from '@/app/actions/wearable'

import { QUERY_KEY } from '@/config'

export const useWearableShowQuery = createQueryHook([QUERY_KEY.WEARABLE], show)

export const useWearableWearMutation = createMutationHook(wear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
export const useWearableUnwearMutation = createMutationHook(unwear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])

export const useWearableDrinkMutation = createMutationHook(drink, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
