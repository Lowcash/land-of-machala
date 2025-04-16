import { getPage } from '@/app/actions/common'
import * as UserAction from '@/app/actions/user'
import * as PlayerAction from '@/app/actions/player'

import LandingLayout from '@/app/landing/layout'
import LandingPage from '@/app/landing/page'
import CreateLayout from '@/app/create/layout'
import CreatePage from '@/app/create/page'
import GameLayout from '@/app/(game)/layout'
import WorldLayout from '@/app/(game)/world/layout'
import WorldPage from '@/app/(game)/world/page'
import QuestPage from '@/app/(game)/quest/page'
import InventoryLayout from '@/app/(game)/inventory/layout'
import InventoryPage from '@/app/(game)/inventory/page'

export default async function Home() {
  if (!(await UserAction.isSigned())?.data)
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )

  if (!(await PlayerAction.get())?.data?.hasCharacter)
    return (
      <CreateLayout>
        <CreatePage />
      </CreateLayout>
    )

  const page = await getPage()

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
