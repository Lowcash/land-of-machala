import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as StatsAction from '@/app/actions/stats'

import { QUERY_KEY } from '@/config'

export const useStatsShowQuery = createQueryHook([QUERY_KEY.STATS], StatsAction.show)