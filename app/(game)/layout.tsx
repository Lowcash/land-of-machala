import Transition from '@/components/Transition'
import { GameProvider } from '@/context/game-provider'
import { Main } from '@/styles/common'
import Hydration from '@/app/(game)/_hydration'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'

export default function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <GameProvider>
        <Header />
        <Hero />
        <Transition pageKey={p.pageKey}>
          <Main layout='spaced'>{p.children}</Main>
        </Transition>
        <Footer />
      </GameProvider>
    </Hydration>
  )
}
