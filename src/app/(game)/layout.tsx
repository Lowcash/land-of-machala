import { Main } from '@/styles/common-server'
import Header from './_components/Header'
import Footer from './_components/Footer'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <Header />
      <Main>{p.children}</Main>
      <Footer />
    </>
  )
}
