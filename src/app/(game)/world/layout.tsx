import SidebarLeft from '../_components/SidebarLeft'
import SidebarRight from '../_components/SidebarRight'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SidebarLeft />
      {children}
      <SidebarRight />
    </>
  )
}
