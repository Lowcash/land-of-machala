'use client'

import { useState } from 'react'

import { CheckCircle, PlayCircle, X } from 'lucide-react'

import { useQuestActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'

import type { MergedQuest } from '../Shared/types'
import { QuestAbandonDialog } from './QuestAbandonDialog'

interface QuestActionsProps {
  // Changed type to interface
  quest: MergedQuest
}

export function QuestActions({ quest }: QuestActionsProps) {
  // 1. Hooks
  const { handleStart, handleComplete, handleAbandon, isPending } = useQuestActions()
  const [showAbandonModal, setShowAbandonModal] = useState(false)

  // 2. Navigation State / Derived Values - None currently

  // 3. Handlers
  const onAbandonConfirm = () => {
    handleAbandon(quest.id)
    setShowAbandonModal(false)
  }

  // 4. Sub-components (Render helpers)
  if (quest.characterStatus === 'COMPLETED') {
    return (
      <div className="flex items-center justify-center gap-2 rounded border border-[#6fbf6f]/50 bg-[#6fbf6f]/10 py-3 text-[#6fbf6f]">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Quest dokončen!
        </span>
      </div>
    )
  }

  if (quest.characterStatus === 'ACTIVE') {
    return (
      <>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => handleComplete(quest.id)}
            disabled={isPending}
            variant="game-primary"
            className="flex flex-1 items-center justify-center gap-2 rounded border-2 border-[#ffd700] bg-[#ffd700]/20 py-3 text-[#ffd700] transition-all hover:bg-[#ffd700]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-fantasy)' }}>
              {isPending ? 'Dokončuji...' : 'Dokončit quest'}
            </span>
          </Button>
          <Button
            onClick={() => setShowAbandonModal(true)}
            disabled={isPending}
            variant="game-danger"
            className="flex h-auto items-center justify-center gap-2 rounded border border-[#ff6b6b] bg-[#ff6b6b]/20 px-4 py-3 text-sm text-[#ff6b6b] transition-colors hover:bg-[#ff6b6b]/30 disabled:cursor-not-allowed disabled:opacity-50"
            title="Vzdát quest"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <QuestAbandonDialog
          questTitle={quest.title}
          isOpen={showAbandonModal}
          onClose={() => setShowAbandonModal(false)}
          onConfirm={onAbandonConfirm}
          isLoading={isPending}
        />
      </>
    )
  }

  // Quest not started yet
  return (
    <Button
      onClick={() => handleStart(quest.id)}
      disabled={isPending}
      variant="game-primary"
      className="flex h-auto w-full items-center justify-center gap-2 rounded border-2 border-[#ffd700] bg-[#ffd700]/20 py-3 text-[#ffd700] transition-all hover:bg-[#ffd700]/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlayCircle className="h-5 w-5" />
      <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {isPending ? 'Přijímám quest...' : 'Přijmout quest'}
      </span>
    </Button>
  )
}
