import { createQueryHook } from '@/hooks/api/_api-hooks'

import { show } from '@/app/actions/common'

import { QUERY_KEY } from '@/config'

export const useCommonShowQuery = createQueryHook([QUERY_KEY.COMMON], show)
