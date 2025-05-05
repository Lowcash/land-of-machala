import PageBodyTransition from '@/components/PageTransition'
import Hydration from '@/app/landing/_hydration'
import { Main } from '@/styles/common'

export default async function Layout(p: Readonly<React.PropsWithChildren<{ pageKey: string }>>) {
  return (
    <Hydration>
      <PageBodyTransition pageKey={p.pageKey}>
        <Main layout='center'>{p.children}</Main>
      </PageBodyTransition>
    </Hydration>
  )
}
