'use client'

import { abandonQuestAction, completeQuestAction, startQuestAction } from '@/lib/actions/quest'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

export function useQuestActions() {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleStart = (questId: string) => {
    execute(() => startQuestAction({ questId }))
  }

  const handleComplete = (questId: string) => {
    execute(() => completeQuestAction({ questId }))
  }

  const handleAbandon = (questId: string) => {
    execute(() => abandonQuestAction({ questId }))
  }

  return {
    isPending,
    handleStart,
    handleComplete,
    handleAbandon,
  }
}
