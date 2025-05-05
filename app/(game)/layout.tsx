import PageBodyTransition from '@/components/PageTransition'
import { GameProvider } from '@/context/game-provider'
import { Main } from '@/styles/common'
import Hydration from '@/app/(game)/_hydration'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <GameProvider>
        <Header />
        <PageBodyTransition pageKey={p.pageKey}>
          <Main layout='spaced'>{p.children}</Main>
        </PageBodyTransition>
        <Footer />
      </GameProvider>
    </Hydration>
  )
}
