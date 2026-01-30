'use client'

import { Check } from 'lucide-react'

import { useSkillActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'

interface SkillUpgradeButtonProps {
  skillId: string
  cost: number
  canUpgrade: boolean
  maxed: boolean
}

export function SkillUpgradeButton({ skillId, cost, canUpgrade, maxed }: SkillUpgradeButtonProps) {
  // 1. Hooks
  const { handleUpgrade, isPending } = useSkillActions()

  // 2. Navigation State / Derived Values - None currently

  // 3. Handlers
  const onUpgrade = () => handleUpgrade(skillId)

  // 4. Sub-components (Render helpers)
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
      onClick={onUpgrade}
      disabled={!canUpgrade || isPending}
      loading={isPending}
      variant={canUpgrade ? 'game-primary' : 'game-secondary'}
      fullWidth
      size="game-tall"
      label={canUpgrade ? `Upgradovat (${cost} bodů)` : 'Nedostatek bodů'}
    />
  )
}
