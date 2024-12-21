import { cn } from '@/lib/utils'

import { H3 } from '@/styles/text-server'

export const Header = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='mb-4' />

export const Section = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />

export const SectionHeader = (p: React.ComponentProps<typeof H3>) => (
  <H3 {...p} className='rounded-lg p-2 text-gray-900' />
)

export const SectionContent = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className='ml-4 flex min-h-8 flex-col justify-center space-y-2 border-l-2 pl-2' />
)

export const SidebarInner = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className='flex h-full flex-col overflow-y-auto rounded-lg px-3 py-4 shadow-side' />
)

export interface SidebarOuterProps {
  open: boolean
  position: 'left' | 'right'
}

export const SidebarOuter = ({
  open,
  position = 'left',
  ...p
}: React.HTMLAttributes<HTMLDivElement> & SidebarOuterProps) => (
  <div
    {...p}
    className={cn(
      'fixed top-9 z-50 h-[calc(100vh-72px)]',
      open ? 'w-64' : 'hidden',
      position === 'left' ? 'left-0' : 'right-0',
    )}
  />
)

interface Props extends SidebarOuterProps {}

export const Sidebar = ({ children, ...p }: React.PropsWithChildren<Props>) => (
  <SidebarOuter {...p}>
    <SidebarInner>{children}</SidebarInner>
  </SidebarOuter>
)
