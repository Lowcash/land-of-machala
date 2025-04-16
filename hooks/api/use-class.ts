import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as ClassAction from '@/app/actions/class'

import { QUERY_KEY } from '@/config'

export const useClassAllQuery = createQueryHook([QUERY_KEY.CLASS], ClassAction.getAll)
