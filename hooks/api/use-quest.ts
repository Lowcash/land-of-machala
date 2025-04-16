import { createQueryHook } from '@/hooks/api/_api-hooks'

import * as QuestAction from '@/app/actions/quest'

import { QUERY_KEY } from '@/config'

export const useQuestAssignedQuery = createQueryHook([QUERY_KEY.QUEST_ASSIGNED], QuestAction.getAssigned)
