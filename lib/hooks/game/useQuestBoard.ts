'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { startQuestAction } from '@/lib/actions/quest'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

import type { MergedQuest } from '@/components/features/Quest/Shared/types'

interface UseQuestBoardProps {
  onBack: () => void
}

export function useQuestBoard({ onBack }: UseQuestBoardProps) {
  const [selectedQuest, setSelectedQuest] = useState<MergedQuest | null>(null)

  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleAcceptQuest = (questId: string) => {
    execute(async () => {
      const result = await startQuestAction({ questId })
      if (result[0]?.success) {
        toast.success(result[0].message)
        onBack() // Go back to town after accepting
      }
      return result
    })
  }

  const handleSelectQuest = (quest: MergedQuest | null) => {
    setSelectedQuest(quest)
  }

  return {
    selectedQuest,
    isPending,
    handleAcceptQuest,
    handleSelectQuest,
  }
}
