import { createQueryHook, createMutationHook } from '@/hooks/api/_api-hooks'

import { showLanding, signUp } from '@/app/actions/user'

import { QUERY_KEY } from '@/config'

export const useUserShowLandingQuery = createQueryHook([QUERY_KEY.LANDING], showLanding)

export const useUserSignUpMutation = createMutationHook(signUp, [])
