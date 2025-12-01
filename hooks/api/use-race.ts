import { createQueryHook } from '@/hooks/api/_api-hooks'

import { show } from '@/app/actions/race'

import { QUERY_KEY } from '@/config'

export const useRaceShowQuery = createQueryHook([QUERY_KEY.RACE], show)
