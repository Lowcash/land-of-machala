import { Main } from '@/styles/common'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
  return <Main>{p.children}</Main>
}
