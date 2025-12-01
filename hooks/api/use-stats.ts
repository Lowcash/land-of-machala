import { createQueryHook } from '@/hooks/api/_api-hooks'

import { show } from '@/app/actions/stats'

import { QUERY_KEY } from '@/config'

export const useStatsShowQuery = createQueryHook([QUERY_KEY.STATS], show)
