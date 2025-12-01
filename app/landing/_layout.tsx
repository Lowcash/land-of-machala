// This is a reusable layout COMPONENT (not a Next.js layout file)
// Used in app/page.tsx for conditional rendering when user is not authenticated
// Named _layout.tsx to differentiate from Next.js layout.tsx convention

import Transition from '@/components/Transition'
import Hydration from '@/app/landing/_hydration'
import { Main } from '@/styles/common'

export default async function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <Transition pageKey={p.pageKey}>
        <Main layout='center'>{p.children}</Main>
      </Transition>
    </Hydration>
  )
}
