import SidebarLeft from '../_components/Sidebar/Left'
import SidebarRight from '../_components/Sidebar/Right'

export default function Layout(p: React.PropsWithChildren) {
  return (
    <>
      <SidebarLeft />
      {p.children}
      <SidebarRight />
    </>
  )
}
