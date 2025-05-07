import { GameProvider } from '@/context/game-provider'
import { H3 } from '@/styles/typography'
import { Main, Header } from '@/styles/common'
import Transition from '@/components/Transition'
import Hydration from '@/app/(game)/_hydration'
import SignOut from '@/components/button/SignOut'
import Coords from '@/components/app/Coords'

export default function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <GameProvider>
        <Header>
          <div>
            <H3>Land of Machala</H3>
          </div>
          <div className='flex items-center gap-2'>
            <Coords />
            <SignOut />
          </div>
        </Header>
        <Transition pageKey={p.pageKey}>
          <Main layout='spaced'>{p.children}</Main>
        </Transition>
      </GameProvider>
    </Hydration>
  )
}
