import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as ArmoryAction from '@/server/actions/armory'

import { QUERY_KEY } from '@/const'

export const useArmoryQuery = createQueryHook([QUERY_KEY.ARMORY], ArmoryAction.show)

export const useBuyItemMutation = createMutationHook(ArmoryAction.buyItem, [QUERY_KEY.PLAYER, QUERY_KEY.ARMORY])
export const useSellItemMutation = createMutationHook(ArmoryAction.sellItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.ARMORY,
])
