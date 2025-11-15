import { createQueryHook } from '@/hooks/api/_api-hooks'

import { show } from '@/app/actions/inventory'

import { QUERY_KEY } from '@/config'

export type InventoryItem = NonNullable<ReturnType<typeof _useInventoryShowQuery>['data']>[
  | 'armors'
  | 'weapons'
  | 'potions'][0]

const _useInventoryShowQuery = createQueryHook([QUERY_KEY.INVENTORY], show)

export function useInventoryShowQuery(...p: Parameters<typeof _useInventoryShowQuery>) {
  const inventoryShowQuery = _useInventoryShowQuery(...p)

  return {
    ...inventoryShowQuery,
    derived: {
      hasDepositArmors: !!inventoryShowQuery.data?.armors,
      hasDepositWeapons: !!inventoryShowQuery.data?.weapons,
      hasDepositPotions: !!inventoryShowQuery.data?.potions,
    },
  }
}
