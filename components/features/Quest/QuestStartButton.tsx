'use client'

import { toast } from '@/components/ui/use-toast'
import { abandonQuestAction, startQuestAction } from '@/lib/actions/quest'
import { CheckCircle, PlayCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { MergedQuest } from './types'

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
        toast({
          variant: 'error',
          title: 'Chyba při přijetí questu',
          description: error.message || 'Nepodařilo se přijmout quest',
        })
      } else if (result?.quest) {
        toast({
          variant: 'success',
          title: 'Quest přijat!',
          description: `Začal jsi quest "${quest.title}"`,
        })

        router.refresh()
      }
    } catch (err) {
      toast({
        variant: 'error',
        title: 'Chyba',
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
        toast({
          variant: 'error',
          title: 'Chyba při opuštění questu',
          description: error.message || 'Nepodařilo se opustit quest',
        })
      } else if (result?.success) {
        toast({
          variant: 'success',
          title: 'Quest opuštěn',
          description: `Opustil jsi quest "${quest.title}"`,
        })

        router.refresh()
      }
    } catch (err) {
      toast({
        variant: 'error',
        title: 'Chyba',
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
        <button
          onClick={handleAbandonQuest}
          disabled={isLoading}
          className="rounded border border-[#ff6b6b] bg-[#ff6b6b]/20 px-4 py-3 text-[#ff6b6b] transition-colors hover:bg-[#ff6b6b]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )
  }

  // Quest not started yet
  return (
    <button
      onClick={handleStartQuest}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded border-2 border-[#ffd700] bg-[#ffd700]/20 py-3 text-[#ffd700] transition-all hover:bg-[#ffd700]/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlayCircle className="h-5 w-5" />
      <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {isLoading ? 'Přijímám quest...' : 'Přijmout quest'}
      </span>
    </button>
  )
}
