'use client'

import { useState } from 'react'

import { CheckCircle, PlayCircle, X } from 'lucide-react'

import { useQuestActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/stack'
import { StatusMessage } from '@/components/ui/status-message'

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
      <StatusMessage variant="success" icon={CheckCircle}>
        Quest dokončen!
      </StatusMessage>
    )
  }

  if (quest.characterStatus === 'ACTIVE') {
    return (
      <>
        <HStack gap="sm" fullWidth>
          <Button
            onClick={() => handleComplete(quest.id)}
            disabled={isPending}
            variant="primary"
            size="md"
            fullWidth
            loading={isPending}
            label="Dokončit quest"
            icon={CheckCircle}
          />
          <Button
            onClick={() => setShowAbandonModal(true)}
            disabled={isPending}
            variant="danger"
            size="md"
            icon={X}
          />
        </HStack>

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
      variant="primary"
      size="md"
      fullWidth
      loading={isPending}
      label="Přijmout quest"
      icon={PlayCircle}
    />
  )
}
