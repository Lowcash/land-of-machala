import { Check } from 'lucide-react'

import { useSkillActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'
import { StatusMessage } from '@/components/ui/status-message'

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
      <StatusMessage variant="success" icon={Check}>
        Maximální level
      </StatusMessage>
    )
  }

  return (
    <Button
      onClick={onUpgrade}
      disabled={!canUpgrade || isPending}
      loading={isPending}
      variant={canUpgrade ? 'primary' : 'secondary_game'}
      fullWidth
      size="lg"
      label={canUpgrade ? `Upgradovat (${cost} bodů)` : 'Nedostatek bodů'}
    />
  )
}
