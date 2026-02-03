import { TOWN_ACTIONS, TOWN_CONFIG } from '@/lib/game/constants/locations'
import type { View } from '@/lib/types/game'

import { ActionGrid } from '@/components/ui/action'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface TownActionsProps {
  onView: (view: View) => void
}

export function TownActions({ onView }: TownActionsProps) {
  // 1. Hooks - None currently

  // 2. Navigation State - None currently

  // 3. Handlers
  const handleAction = (view: View) => onView(view)

  // 4. Sub-components (Render helpers) - None currently

  return (
    <LocationLayout title={TOWN_CONFIG.title} description={TOWN_CONFIG.description}>
      <ActionGrid columns={{ default: 2, sm: 3 }}>
        {TOWN_ACTIONS.map((action) => (
          <LocationAction
            key={action.id}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variant={(action.variantOverride || action.variant) as any}
            title={action.title}
            icon={action.icon}
            onClick={() => handleAction(action.view)}
          />
        ))}
      </ActionGrid>
    </LocationLayout>
  )
}
