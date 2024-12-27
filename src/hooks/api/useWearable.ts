import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as WearableAction from '@/server/actions/wearable'

import { QUERY_KEY } from '@/const'

export const useWearableQuery = createQueryHook([QUERY_KEY.WEARABLE], WearableAction.get)

export const useWearMutation = createMutationHook(WearableAction.wear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])
export const useUnwearMutation = createMutationHook(WearableAction.unwear, [
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.INVENTORY,
])

export const useDrinkMutation = createMutationHook(WearableAction.drink, [QUERY_KEY.WEARABLE, QUERY_KEY.INVENTORY])
