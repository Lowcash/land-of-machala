import Hydration from '@/app/(game)/inventory/_hydration'

export default function Layout(p: React.PropsWithChildren) {
  return <Hydration>{p.children}</Hydration>
}
