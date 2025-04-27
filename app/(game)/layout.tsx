import { GameProvider } from '@/context/game-provider'
import { Main } from '@/styles/common'
import Hydration from '@/app/(game)/_hydration'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <Hydration>
      <GameProvider>
        <Header />
        <Main layout='spaced'>{p.children}</Main>
        <Footer />
      </GameProvider>
    </Hydration>
  )
}
