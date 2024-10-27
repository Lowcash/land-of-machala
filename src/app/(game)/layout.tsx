import { Main } from '@/styles/common-server'
import Header from './_components/Header'
import Footer from './_components/Footer'

export default async function Layout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
