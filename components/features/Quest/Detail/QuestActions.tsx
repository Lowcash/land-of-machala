'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { CheckCircle, PlayCircle, Trophy, X } from 'lucide-react'
import { toast } from 'sonner'

import { abandonQuestAction, completeQuestAction, startQuestAction } from '@/lib/actions/quest'
import type { UnlockedAchievement } from '@/lib/types/game'

import { Button } from '@/components/ui/button'

import type { MergedQuest } from '../Shared/types'
import { QuestAbandonDialog } from './QuestAbandonDialog'

interface QuestActionsProps {
  // Changed type to interface
  quest: MergedQuest
}

export function QuestActions({ quest }: QuestActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showAbandonModal, setShowAbandonModal] = useState(false)
  const router = useRouter()

  const handleCompleteQuest = () => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [result, error] = await completeQuestAction({
          questId: quest.id,
        })

        if (error) {
          toast.error('Chyba při dokončení questu', {
            description: error.message || 'Nepodařilo se dokončit quest',
          })
        } else if (result?.success) {
          toast.success('Quest dokončen!', {
            description: `Získal jsi ${result.rewards.xp} XP a ${result.rewards.gold} zlata.`,
          })

          // Toast achievements
          if (result.achievements && result.achievements.length > 0) {
            result.achievements.forEach((ach: UnlockedAchievement) => {
              toast.success(`Úspěch odemčen: ${ach.title}`, {
                icon: <Trophy className="h-4 w-4 text-[#ffd700]" />,
                description: `Odměna: ${ach.rewards.xp} XP, ${ach.rewards.gold} zlata`,
              })
            })
          }

          router.refresh()
        }
      } catch {
        toast.error('Chyba', {
          description: 'Něco se pokazilo při dokončování questu',
        })
      }
    })
  }

  const handleStartQuest = () => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [result, error] = await startQuestAction({
          questId: quest.id,
        })

        if (error) {
          toast.error('Chyba při přijetí questu', {
            description: error.message || 'Nepodařilo se přijmout quest',
          })
        } else if (result?.quest) {
          toast.success('Quest přijat!', {
            description: `Začal jsi quest "${quest.title}"`,
          })

          router.refresh()
        }
      } catch {
        toast.error('Chyba', {
          description: 'Něco se pokazilo při přijímání questu',
        })
      }
    })
  }

  const handleAbandonQuest = () => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [result, error] = await abandonQuestAction({
          questId: quest.id,
        })

        if (error) {
          toast.error('Chyba při opuštění questu', {
            description: error.message || 'Nepodařilo se opustit quest',
          })
        } else if (result?.success) {
          toast.success('Quest opuštěn', {
            description: `Opustil jsi quest "${quest.title}"`,
          })
          setShowAbandonModal(false)
          router.refresh()
        }
      } catch {
        toast.error('Chyba', {
          description: 'Něco se pokazilo při opouštění questu',
        })
      }
    })
  }

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
            onClick={handleCompleteQuest}
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
          onConfirm={handleAbandonQuest}
          isLoading={isPending}
        />
      </>
    )
  }

  // Quest not started yet
  return (
    <Button
      onClick={handleStartQuest}
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
