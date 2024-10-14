import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { buyItem, sellItem, showArmory } from '@/server/actions/armory'

import { QUERY_KEY } from '@/const'

export const useArmoryQuery = createQueryHook([QUERY_KEY.ARMORY], showArmory)

export const useBuyItemMutation = createMutationHook(buyItem, [QUERY_KEY.PLAYER, QUERY_KEY.ARMORY])
export const useSellItemMutation = createMutationHook(sellItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.ARMORY,
])
