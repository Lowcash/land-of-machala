import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as ArmoryAction from '@/app/actions/armory'

import { QUERY_KEY } from '@/config'

export const useArmoryShowQuery = createQueryHook([QUERY_KEY.ARMORY], ArmoryAction.show)

export const useArmoryBuyItemMutation = createMutationHook(ArmoryAction.buyItem, [QUERY_KEY.PLAYER, QUERY_KEY.ARMORY])
export const useArmorySellItemMutation = createMutationHook(ArmoryAction.sellItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.ARMORY,
])
