import { COMBAT_ACTIONS } from '@/lib/game/constants/combat'

import { GameActionPanel } from '@/components/features/Game/Shared/components/GameActionPanel'
import { ActionGrid, ActionItem } from '@/components/ui/action'
import type { ActionItemProps } from '@/components/ui/action/ActionItem'

interface CombatActionsProps {
  onAction: (action: 'attack' | 'defend' | 'special' | 'flee') => void
  isPending: boolean
}

export function CombatActions({ onAction, isPending }: CombatActionsProps) {
  // 1. Hooks - None currently

  // 2. Navigation State - None currently

  // 3. Handlers
  const handleAction = (action: 'attack' | 'defend' | 'special' | 'flee') => onAction(action)

  // 4. Sub-components (Render helpers)
  const offensiveActions = COMBAT_ACTIONS.filter((a) => a.group === 'offensive')
  const defensiveActions = COMBAT_ACTIONS.filter((a) => a.group === 'defensive')

  const renderAction = (action: (typeof COMBAT_ACTIONS)[number]) => (
    <ActionItem
      key={action.id}
      label={action.label}
      subLabel={action.subLabel}
      icon={action.icon}
      onClick={() => handleAction(action.action)}
      disabled={isPending}
      variant={action.variant as ActionItemProps['variant']}
      layout="row"
    />
  )

  const attackContent = (
    <ActionGrid columns={{ default: 1 }}>{offensiveActions.map(renderAction)}</ActionGrid>
  )

  const defenseContent = (
    <ActionGrid columns={{ default: 1, sm: 2 }}>{defensiveActions.map(renderAction)}</ActionGrid>
  )

  return (
    <GameActionPanel
      sideTitle="Útok"
      mainTitle="Obrana & Taktika"
      sideContent={attackContent}
      mainContent={defenseContent}
    />
  )
}
