import { createQueryHook } from '@/hooks/api/_api-hooks'

import { show } from '@/app/actions/class'

import { QUERY_KEY } from '@/config'

export const useClassShowQuery = createQueryHook([QUERY_KEY.CLASS], show)
