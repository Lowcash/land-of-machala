import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as WearableAction from '@/app/actions/wearable'

import { QUERY_KEY } from '@/config'

export const useWearableShowQuery = createQueryHook([QUERY_KEY.WEARABLE], WearableAction.show)

export const useWearableWearMutation = createMutationHook(WearableAction.wear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
export const useWearableUnwearMutation = createMutationHook(WearableAction.unwear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])

export const useWearableDrinkMutation = createMutationHook(WearableAction.drink, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
