import { Content, Main } from '@/styles/common-server'
import Footer from '@/app/(game)/_components/Footer'
import Header from '@/app/(game)/_components/Header'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <Header />
      <Main>
        <Content>{p.children}</Content>
      </Main>
      <Footer />
    </>
  )
}
