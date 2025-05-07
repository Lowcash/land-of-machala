import Transition from '@/components/Transition'
import Hydration from '@/app/create/_hydration'
import { Main, Header } from '@/styles/common'

export default function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <Transition pageKey={p.pageKey}>
        <Header />
        <Main layout='center'>{p.children}</Main>
      </Transition>
    </Hydration>
  )
}
