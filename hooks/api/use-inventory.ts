import { createQueryHook } from '@/hooks/api/_api-hooks'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { SafeActionResultData } from '@/lib/safe-action-client-utils'

import { show } from '@/app/actions/inventory'

import { QUERY_KEY } from '@/config'

export type InventoryItem = NonNullable<SafeActionResultData<typeof show>>[
  | 'armors'
  | 'weapons'
  | 'potions'][0]

const _useInventoryShowQuery = createQueryHook([QUERY_KEY.INVENTORY], show)

type InventoryData = SafeActionResultData<typeof show>

export function useInventoryShowQuery(
  params?: Parameters<typeof _useInventoryShowQuery>[0],
  options?: Omit<UseQueryOptions<InventoryData, Error, InventoryData, string[]>, 'queryKey' | 'queryFn'>,
) {
  const inventoryShowQuery = _useInventoryShowQuery(params, options as Parameters<typeof _useInventoryShowQuery>[1])

  return {
    ...inventoryShowQuery,
    derived: {
      hasDepositArmors: !!inventoryShowQuery.data?.armors,
      hasDepositWeapons: !!inventoryShowQuery.data?.weapons,
      hasDepositPotions: !!inventoryShowQuery.data?.potions,
    },
  }
}
