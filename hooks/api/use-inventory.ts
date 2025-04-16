import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as InvetoryAction from '@/app/actions/inventory'

import { QUERY_KEY } from '@/config'

export const useInventoryShowQuery = createQueryHook([QUERY_KEY.INVENTORY], InvetoryAction.show)
