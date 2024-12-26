import Hydration from '@/app/(game)/_hydration'
import { GameProvider } from '@/context/game-provider'
import { Content, Main } from '@/styles/common-server'
import Footer from '@/app/(game)/_components/Footer'
import Header from '@/app/(game)/_components/Header'
import SidebarLeft from '@/app/(game)/_components/Sidebar/Left'
import SidebarRight from '@/app/(game)/_components/Sidebar/Right'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
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
