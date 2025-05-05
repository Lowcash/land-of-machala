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
      <LandingLayout pageKey='landing'>
        <LandingPage />
      </LandingLayout>
    )

  if (!(await PlayerAction.show())?.data)
    return (
      <CreateLayout pageKey='create'>
        <CreatePage />
      </CreateLayout>
    )

  const page = await getPage()

  switch (page) {
    case 'WORLD':
      return (
        <GameLayout pageKey='world'>
          <WorldLayout>
            <WorldPage />
          </WorldLayout>
        </GameLayout>
      )
    case 'QUEST':
      return (
        <GameLayout pageKey='quest'>
          <QuestPage />
        </GameLayout>
      )
    case 'INVENTORY':
      return (
        <GameLayout pageKey='inventory'>
          <InventoryLayout>
            <InventoryPage />
          </InventoryLayout>
        </GameLayout>
      )
    default:
      return <></>
  }
}
