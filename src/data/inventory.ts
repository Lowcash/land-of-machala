import { createQueryHook } from '@/app/api/_api-hooks'
import { showInventory } from '@/server/actions/inventory'

import { QUERY_KEY } from '@/const'

export const useShowInventoryQuery = createQueryHook([QUERY_KEY.INVENTORY], showInventory)
