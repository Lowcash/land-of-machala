import tw from 'tailwind-styled-components'

import { H3 } from '@/styles/text-server'

interface Props {
  $open: boolean
  $position: 'left' | 'right'
}

const SidebarOuter = tw.div<Props>`
  fixed z-50 h-[calc(100vh-72px)] top-9
  ${(p) => (p.$open ? 'w-64' : 'hidden')}
  ${(p) => (p.$position === 'left' ? 'left-0' : 'right-0')}
`

const SidebarInner = tw.div`flex h-full flex-col overflow-y-auto rounded-lg px-3 py-4 shadow-side`

const SidebarHeader = tw.div`mb-4`
const SidebarSection = tw.div``
const SidebarSectionHeader = tw(H3)`rounded-lg p-2 text-gray-900`
const SidebarSectionContent = tw.div`ml-4 flex min-h-8 flex-col justify-center space-y-2 border-l-2 pl-2`

export function Sidebar({ children, ...p }: React.PropsWithChildren<Props>) {
  return (
    <SidebarOuter {...p}>
      <SidebarInner>{children}</SidebarInner>
    </SidebarOuter>
  )
}

Sidebar.Header = SidebarHeader
Sidebar.Section = SidebarSection
Sidebar.SectionHeader = SidebarSectionHeader
Sidebar.SectionContent = SidebarSectionContent
