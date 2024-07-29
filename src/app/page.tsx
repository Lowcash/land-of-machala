import { cookies } from 'next/headers'
import { getServerAuthSession } from '@/server/auth'
import { hasCharacter } from './(game)/actions'

import LandingLayout from './landing/layout'
import CreatePage from './create/page'
import LandingPage from './landing/page'
import GameLayout from './(game)/layout'
import PlayLayout from './(game)/world/layout'
import PlayPage from './(game)/world/page'
import QuestPage from './(game)/quest/page'
import InventoryPage from './(game)/inventory/page'

import { ROUTE } from '@/const'

export default async function Page() {
  const session = await getServerAuthSession()

  if (!session)
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )

  if (!hasCharacter()) return <CreatePage />

  const pathname = cookies().get('page')?.value || ROUTE.WORLD

  return (
    <GameLayout>
      <PlayLayout>
        {pathname === ROUTE.WORLD && <PlayPage />}
        {pathname === ROUTE.QUEST && <QuestPage />}
        {pathname === ROUTE.INVENTORY && <InventoryPage />}
      </PlayLayout>
    </GameLayout>
  )
}
