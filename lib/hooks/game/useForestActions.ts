'use client'

import { toast } from 'sonner'

import { initiateCombatAction } from '@/lib/actions/combat'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'
import type { View } from '@/lib/types/game'

interface UseForestActionsProps {
  onView: (view: View) => void
}

export function useForestActions({ onView }: UseForestActionsProps) {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleHunt = () => {
    execute(async () => {
      const result = await initiateCombatAction()
      return result
    })
  }

  const handleExplore = () => {
    toast.info('Prozkoumáváš les... (Zatím nic nenašeno, WIP)')
  }

  const handleReturn = () => {
    onView('town')
  }

  return {
    handleHunt,
    handleExplore,
    handleReturn,
    isPending,
  }
}
