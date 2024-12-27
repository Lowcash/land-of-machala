import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as InvetoryAction from '@/server/actions/inventory'

import { QUERY_KEY } from '@/const'

export const useShowInventoryQuery = createQueryHook([QUERY_KEY.INVENTORY], InvetoryAction.show)
