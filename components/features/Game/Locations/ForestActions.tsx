'use client'

import { FOREST_ACTIONS } from '@/lib/game/constants/interactive'
import { useForestActions } from '@/lib/hooks/game'
import type { View } from '@/lib/types/game'

import { ActionGrid } from '@/components/ui/action'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface ForestActionsProps {
  onView: (view: View) => void
}

export function ForestActions({ onView }: ForestActionsProps) {
  // 1. Hooks
  const { handleHunt, handleExplore, handleReturn, isPending } = useForestActions({
    onView,
  })

  // 2. Navigation State - None currently

  // 3. Handlers
  const getActionHandler = (actionId: string) => {
    switch (actionId) {
      case 'hunt':
        return handleHunt
      case 'explore':
        return handleExplore
      case 'return':
        return handleReturn
      default:
        return () => {}
    }
  }

  // 4. Sub-components (Render helpers) - None currently

  return (
    <LocationLayout
      title="Temný Hvozd"
      description="Hustý, neprostupný les se rozkládá za hradbami města. Ideální místo pro lov a smrt."
    >
      <ActionGrid columns={{ default: 1 }}>
        {FOREST_ACTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant={action.variant}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={getActionHandler(action.actionId)}
            disabled={isPending}
          />
        ))}
      </ActionGrid>
    </LocationLayout>
  )
}
