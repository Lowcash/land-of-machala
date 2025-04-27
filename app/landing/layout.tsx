import Hydration from '@/app/landing/_hydration'
import { Main } from '@/styles/common'

export default async function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <Hydration>
      <Main layout='center'>{p.children}</Main>
    </Hydration>
  )
}
