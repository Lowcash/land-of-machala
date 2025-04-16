import Hydration from '@/app/create/_hydration'
import Header from '@/components/layout/Header'

export default function Layout(p: Readonly<React.PropsWithChildren>) {
  return (
    <Hydration>
      <Header />
      {p.children}
    </Hydration>
  )
}
