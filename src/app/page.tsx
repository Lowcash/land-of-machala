import { cookies } from 'next/headers'
import { getServerAuthSession } from '@/server/auth'
// import { hasCharacter } from '@/app/actions'

import LandingLayout from './landing/layout'
import CreatePage from './create/page'
import LandingPage from './landing/page'
import GameLayout from './(game)/layout'
import PlayLayout from './(game)/world/layout'
import PlayPage from './(game)/world/page'
import QuestPage from './(game)/quest/page'
import InventoryPage from './(game)/inventory/page'

import { ROUTE } from '@/const'
import ABCD from './ABCD'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchGetUserQuery } from '@/data/user-server'
import { getUserSession, hasCharacter } from '@/server/actions/user'

export default async function Page() {
  // const queryClient = new QueryClient()

  // await prefetchGetUserQuery(queryClient)

  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <ABCD />
  //   </HydrationBoundary>
  // )

  if (!(await getUserSession()))
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    )

  if (!(await hasCharacter())) return <CreatePage />

  const pathname = cookies().get('page')?.value || ROUTE.WORLD

  return <>{pathname}</>
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
