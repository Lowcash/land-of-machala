import * as S from './styles'

interface Props extends S.SidebarOuterProps {}

export default function Sidebar({ children, ...p }: React.PropsWithChildren<Props>) {
  return (
    <S.SidebarOuter {...p}>
      <S.SidebarInner {...p}>{children}</S.SidebarInner>
    </S.SidebarOuter>
  )
}

Sidebar.Header = S.Header
Sidebar.Section = S.Section
Sidebar.SectionHeader = S.SectionHeader
Sidebar.SectionContent = S.SectionContent
