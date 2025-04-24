import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as ArmoryAction from '@/app/actions/armory'

import { QUERY_KEY } from '@/config'

export type ArmoryItem = NonNullable<ReturnType<typeof _useArmoryShowQuery>['data']>[
  | 'buyArmors'
  | 'buyWeapons'
  | 'sellArmors'
  | 'sellWeapons'][0]

const _useArmoryShowQuery = createQueryHook([QUERY_KEY.ARMORY], ArmoryAction.show)

export function useArmoryShowQuery(...p: Parameters<typeof _useArmoryShowQuery>) {
  const armoryShowQuery = _useArmoryShowQuery(...p)

  return {
    ...armoryShowQuery,
    derived: {
      hasBuyArmors: !!armoryShowQuery.data?.buyArmors.length,
      hasBuyWeapons: !!armoryShowQuery.data?.buyWeapons.length,
      hasSellArmors: !!armoryShowQuery.data?.sellArmors.length,
      hasSellWeapons: !!armoryShowQuery.data?.sellWeapons.length,
    },
  }
}

export const useArmoryBuyItemMutation = createMutationHook(ArmoryAction.buyItem, [QUERY_KEY.PLAYER, QUERY_KEY.ARMORY])
export const useArmorySellItemMutation = createMutationHook(ArmoryAction.sellItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.ARMORY,
])
