import { GameProvider } from '@/context/game-provider'
import { Content, Main } from '@/styles/common'
import Hydration from '@/app/(game)/_hydration'
import SidebarLeft from '@/components/layout/Sidebar/Left'
import SidebarRight from '@/components/layout/Sidebar/Right'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <Hydration>
      <GameProvider>
        <Header />
        <Main>
          <SidebarLeft />
          <Content>{p.children}</Content>
          <SidebarRight />
        </Main>
        <Footer />
      </GameProvider>
    </Hydration>
  )
}
