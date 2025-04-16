import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as RaceAction from '@/app/actions/race'

import { QUERY_KEY } from '@/config'

export const useRaceAllQuery = createQueryHook([QUERY_KEY.RACE], RaceAction.getAll)
