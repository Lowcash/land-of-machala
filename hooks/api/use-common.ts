import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as CommonAction from '@/app/actions/common'

import { QUERY_KEY } from '@/config'

export const useCommonShowQuery = createQueryHook([QUERY_KEY.COMMON], CommonAction.show)
