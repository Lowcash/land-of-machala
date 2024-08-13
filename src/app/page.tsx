import { getPlayerSession, hasPlayerCharacter } from '@/server/actions/player'
import { cookies } from 'next/headers'

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
  if (!(await getPlayerSession()))
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )

  if (!(await hasPlayerCharacter())) return <CreatePage />

  // // const pathname = cookies().get('page')?.value || ROUTE.WORLD

  return (
    <GameLayout>
      <PlayLayout>ABCD</PlayLayout>
    </GameLayout>
  )

  // return (
  //   <GameLayout>
  //     <PlayLayout>
  //       {pathname === ROUTE.WORLD && <PlayPage />}
  //       {pathname === ROUTE.QUEST && <QuestPage />}
  //       {pathname === ROUTE.INVENTORY && <InventoryPage />}
  //     </PlayLayout>
  //   </GameLayout>
  // )
}
