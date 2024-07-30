import SidebarLeft from '../_components/Sidebar/Left'
import SidebarRight from '../_components/Sidebar/Right'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SidebarLeft />
      {children}
      <SidebarRight />
    </>
  )
}
