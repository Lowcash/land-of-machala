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
import PageBodyTransition from '@/components/PageTransition'

export default async function Home() {
  let pageContent = null
  let pageKey = ''

  if (!(await UserAction.isSigned())?.data) {
    pageContent = (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )
    pageKey = 'landing'
  } else if (!(await PlayerAction.show())?.data) {
    pageContent = (
      <CreateLayout>
        <CreatePage />
      </CreateLayout>
    )
    pageKey = 'create'
  } else {
    const page = await getPage()
    if (page === 'WORLD') {
      pageContent = (
        <GameLayout>
          <WorldLayout>
            <WorldPage />
          </WorldLayout>
        </GameLayout>
      )
      pageKey = 'world'
    } else if (page === 'QUEST') {
      pageContent = (
        <GameLayout>
          <QuestPage />
        </GameLayout>
      )
      pageKey = 'quest'
    } else if (page === 'INVENTORY') {
      pageContent = (
        <GameLayout>
          <InventoryLayout>
            <InventoryPage />
          </InventoryLayout>
        </GameLayout>
      )
      pageKey = 'inventory'
    }
  }

  return <PageBodyTransition pageKey={pageKey}>{pageContent}</PageBodyTransition>
}
