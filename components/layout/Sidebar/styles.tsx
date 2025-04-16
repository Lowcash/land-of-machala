import { cn } from '@/lib/utils'

import { H3 } from '@/styles/typography'

export const Header = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='mb-4' />

export const Section = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />

export const SectionHeader = (p: React.ComponentProps<typeof H3>) => (
  <H3 {...p} className='rounded-lg p-2 text-gray-900' />
)

export const SectionContent = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className='ml-4 flex min-h-8 flex-col justify-center space-y-2 border-l-2 pl-2' />
)

type Position = 'left' | 'right'

export interface SidebarInnerProps {
  position: Position
}

export const SidebarInner = (p: React.HTMLAttributes<HTMLDivElement> & SidebarInnerProps) => (
  <div
    {...p}
    className={cn(
      'flex h-full flex-col overflow-y-auto bg-custom-gold-1 px-3 py-4 shadow-side',
      p.position === 'left' ? 'rounded-ee-lg rounded-se-lg' : 'rounded-es-lg rounded-ss-lg',
    )}
  />
)

export interface SidebarOuterProps {
  open: boolean
  position: Position
}

export const SidebarOuter = ({ open, position, ...p }: React.HTMLAttributes<HTMLElement> & SidebarOuterProps) => (
  <aside
    {...p}
    className={cn(
      'fixed top-9 z-50 h-[calc(100vh-72px)]',
      open ? 'w-64' : 'hidden',
      position === 'left' ? 'left-0' : 'right-0',
    )}
  />
)
