import Hydration from '@/app/(game)/quest/_hydration'

export default function Layout(p: React.PropsWithChildren) {
  return <Hydration>{p.children}</Hydration>
}
