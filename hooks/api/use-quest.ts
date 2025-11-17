import { createQueryHook } from '@/hooks/api/_api-hooks'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { SafeActionResultData } from '@/lib/safe-action-client-utils'

import { showAssigned } from '@/app/actions/quest'

import { QUERY_KEY } from '@/config'

const _useQuestShowAssignedQuery = createQueryHook([QUERY_KEY.QUEST_ASSIGNED], showAssigned)

type QuestAssignedData = SafeActionResultData<typeof showAssigned>

export const useQuestShowAssignedQuery = (
  params?: Parameters<typeof _useQuestShowAssignedQuery>[0],
  options?: Omit<UseQueryOptions<QuestAssignedData, Error, QuestAssignedData, string[]>, 'queryKey' | 'queryFn'>,
) => _useQuestShowAssignedQuery(params, options as Parameters<typeof _useQuestShowAssignedQuery>[1])
