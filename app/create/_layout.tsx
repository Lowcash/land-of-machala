// This is a reusable layout COMPONENT (not a Next.js layout file)
// Used in app/page.tsx for conditional rendering when user is authenticated but has no player
// Named _layout.tsx to differentiate from Next.js layout.tsx convention

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
