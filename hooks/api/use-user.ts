import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as UserAction from '@/app/actions/user'

import { QUERY_KEY } from '@/config'

export const useUserShowLandingQuery = createQueryHook([QUERY_KEY.STATS], UserAction.showLanding)