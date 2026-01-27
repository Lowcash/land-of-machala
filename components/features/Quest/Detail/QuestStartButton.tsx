'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { CheckCircle, PlayCircle, X } from 'lucide-react'
import { toast } from 'sonner'

import { abandonQuestAction, startQuestAction } from '@/lib/actions/quest'

import { Button } from '@/components/ui/button'

import type { MergedQuest } from '../Shared/types'

type QuestStartButtonProps = {
  quest: MergedQuest
}

export function QuestStartButton({ quest }: QuestStartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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
      <div className="flex gap-2">
        <div className="flex flex-1 items-center justify-center gap-2 rounded border border-[#ffd700]/50 bg-[#ffd700]/10 py-3 text-[#ffd700]">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
            Aktivní quest
          </span>
        </div>
        <Button
          onClick={handleAbandonQuest}
          disabled={isPending}
          variant="game-danger"
          className="flex h-auto items-center gap-2 rounded border border-[#ff6b6b] bg-[#ff6b6b]/20 px-4 py-3 text-sm text-[#ff6b6b] transition-colors hover:bg-[#ff6b6b]/30 disabled:cursor-not-allowed disabled:opacity-50"
          title="Vzdát quest"
        >
          <X className="h-5 w-5" />
          <span className="hidden sm:inline">Vzdát quest</span>
        </Button>
      </div>
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
