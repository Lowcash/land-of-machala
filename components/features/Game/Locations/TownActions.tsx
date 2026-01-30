import { TOWN_ACTIONS, TOWN_CONFIG } from '@/lib/game/constants/locations'
import type { View } from '@/lib/types/game'

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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOWN_ACTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant={action.variant}
            title={action.title}
            icon={action.icon}
            className={action.className}
            onClick={() => handleAction(action.view)}
          />
        ))}
      </div>
    </LocationLayout>
  )
}
