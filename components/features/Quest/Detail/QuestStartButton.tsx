'use client'

import { Button } from '@/components/ui/button'
import { abandonQuestAction, startQuestAction } from '@/lib/actions/quest'
import { CheckCircle, PlayCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import type { MergedQuest } from '../Shared/types'

type QuestStartButtonProps = {
  quest: MergedQuest
  characterId: string
}

export function QuestStartButton({ quest, characterId }: QuestStartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStartQuest = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const [result, error] = await startQuestAction({
        characterId,
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleAbandonQuest = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const [result, error] = await abandonQuestAction({
        characterId,
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
    } finally {
      setIsLoading(false)
    }
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
          disabled={isLoading}
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
      disabled={isLoading}
      variant="game-primary"
      className="flex h-auto w-full items-center justify-center gap-2 rounded border-2 border-[#ffd700] bg-[#ffd700]/20 py-3 text-[#ffd700] transition-all hover:bg-[#ffd700]/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlayCircle className="h-5 w-5" />
      <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {isLoading ? 'Přijímám quest...' : 'Přijmout quest'}
      </span>
    </Button>
  )
}
