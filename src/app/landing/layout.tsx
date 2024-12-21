import { Main } from '@/styles/common-server'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
  return <Main>{p.children}</Main>
}
