import { Main } from '@/styles/common-server'

export default async function Layout({ children }: Readonly<React.PropsWithChildren>) {
  return <Main>{children}</Main>
}
