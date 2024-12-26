import { getServerPage } from '@/lib/utls-server'
import * as PlayerAction from '@/server/actions/player'

import LandingLayout from './landing/layout'
import CreatePage from './create/page'
import LandingPage from './landing/page'
import GameLayout from './(game)/layout'
import WorldLayout from './(game)/world/layout'
import InventoryLayout from './(game)/inventory/layout'
import WorldPage from './(game)/world/page'
import QuestPage from './(game)/quest/page'
import InventoryPage from './(game)/inventory/page'

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await PlayerAction.getSession()))
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )

  if (!(await PlayerAction.get()).hasCharacter) return <CreatePage />

  const page = getServerPage()

  return (
    <GameLayout>
      {page === 'WORLD' && (
        <WorldLayout>
          <WorldPage />
        </WorldLayout>
      )}
      {page === 'QUEST' && <QuestPage />}
      {page === 'INVENTORY' && (
        <InventoryLayout>
          <InventoryPage />
        </InventoryLayout>
      )}
    </GameLayout>
  )
}
