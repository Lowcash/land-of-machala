import { Main, Footer } from '@/styles/common-server'
import Header from './_components/Header'

export default async function Layout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
