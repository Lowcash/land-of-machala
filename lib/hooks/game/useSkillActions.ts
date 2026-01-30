'use client'

import { increaseSkillRankAction } from '@/lib/actions/skill'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

export function useSkillActions() {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleUpgrade = (skillId: string) => {
    execute(() => increaseSkillRankAction({ skillId }))
  }

  return {
    isPending,
    handleUpgrade,
  }
}
