'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { increaseSkillRankAction } from '@/lib/actions/skill'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SkillUpgradeButtonProps = {
  characterId: string
  skillId: string
  skillName: string
  cost: number
  canUpgrade: boolean
  maxed: boolean
}

export function SkillUpgradeButton({
  characterId,
  skillId,
  skillName,
  cost,
  canUpgrade,
  maxed,
}: SkillUpgradeButtonProps) {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleUpgrade = async () => {
    if (!canUpgrade || isUpgrading) return

    setIsUpgrading(true)

    try {
      const [result, error] = await increaseSkillRankAction({
        characterId,
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
    } finally {
      setIsUpgrading(false)
    }
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
      disabled={!canUpgrade || isUpgrading}
      loading={isUpgrading}
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
