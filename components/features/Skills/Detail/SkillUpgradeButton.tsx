'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { Check } from 'lucide-react'

import { increaseSkillRankAction } from '@/lib/actions/skill'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'

interface SkillUpgradeButtonProps {
  skillId: string
  skillName: string
  cost: number
  canUpgrade: boolean
  maxed: boolean
}

export function SkillUpgradeButton({
  skillId,
  skillName,
  cost,
  canUpgrade,
  maxed,
}: SkillUpgradeButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleUpgrade = () => {
    if (!canUpgrade || isPending) return

    startTransition(async () => {
      try {
        const [result, error] = await increaseSkillRankAction({
          skillId,
        })

        if (error) {
          showNotification({
            variant: 'error',
            title: 'Chyba při upgradu',
            description: error.message || 'Nepodařilo se upgradovat dovednost',
          })
        } else if (result?.success) {
          showNotification({
            variant: 'success',
            title: 'Dovednost upgradována!',
            description: `${skillName} byl úspěšně vylepšen`,
          })

          // Refresh the page to show updated data
          router.refresh()
        }
      } catch {
        showNotification({
          variant: 'error',
          title: 'Chyba',
          description: 'Něco se pokazilo při upgradu dovednosti',
        })
      }
    })
  }

  if (maxed) {
    return (
      <div className="flex items-center justify-center gap-2 py-2 text-[#6fbf6f] sm:py-3">
        <Check className="h-4 w-4" />
        <span className="text-sm">Maximální level</span>
      </div>
    )
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={!canUpgrade || isPending}
      loading={isPending}
      variant={canUpgrade ? 'game-primary' : 'game-secondary'}
      className="min-h-touch-target w-full py-2 sm:min-h-0 sm:py-3"
      style={{ fontFamily: 'var(--font-fantasy)' }}
    >
      <span className="text-sm">
        {canUpgrade ? `Upgradovat (${cost} bodů)` : 'Nedostatek bodů'}
      </span>
    </Button>
  )
}
