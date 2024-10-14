import { createMutationHook } from '@/app/api/_api-hooks'
import { drink, unwear, wear } from '@/server/actions/wearable'

import { QUERY_KEY } from '@/const'

export const useWearMutation = createMutationHook(wear, [QUERY_KEY.WEARABLE, QUERY_KEY.INVENTORY])
export const useUnwearMutation = createMutationHook(unwear, [QUERY_KEY.WEARABLE, QUERY_KEY.INVENTORY])

export const useDrinkMutation = createMutationHook(drink, [QUERY_KEY.WEARABLE, QUERY_KEY.INVENTORY])
