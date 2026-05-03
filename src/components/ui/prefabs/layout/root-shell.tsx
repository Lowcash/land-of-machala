import Image from 'next/image'

import clsx from 'clsx'

import { SITE_BACKGROUND_PATH } from '@/lib/site-config'

import { Box } from '@/components/ui/core/layout'
import { RootShellFooter } from '@/components/ui/prefabs/layout/root-shell-footer'
import { RootShellHeader } from '@/components/ui/prefabs/layout/root-shell-header'

type RootShellProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

type RootShellFrameAs = 'div' | 'footer' | 'header' | 'section'
type RootShellFrameInset = 'band' | 'page' | 'stage'

type RootShellFrameProps = {
  as?: RootShellFrameAs
  children: React.ReactNode
  className?: string
  inset?: RootShellFrameInset
}

const ROOT_SHELL_FRAME_CLASS =
  'mx-auto w-full max-w-6xl px-(--space-shell-inset-x) md:px-(--space-shell-inset-x-lg)'

const ROOT_SHELL_FRAME_INSET_CLASS: Record<RootShellFrameInset, string> = {
  band: 'py-(--space-shell-band-y) md:py-(--space-shell-band-y-lg)',
  page: 'py-(--space-shell-page-y) md:py-(--space-shell-page-y-lg)',
  stage: 'py-(--space-shell-stage-y) md:py-(--space-shell-stage-y-lg)',
}

const SHELL_OVERLAY_CLASS =
  'from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br'

export function RootShellFrame({
  as = 'div',
  children,
  className,
  inset = 'page',
}: RootShellFrameProps) {
  const Component = as

  return (
    <Component
      className={clsx(ROOT_SHELL_FRAME_CLASS, ROOT_SHELL_FRAME_INSET_CLASS[inset], className)}
    >
      {children}
    </Component>
  )
}

export function RootShell({ children, className = '', ...props }: RootShellProps) {
  return (
    <div
      className={clsx('bg-background relative isolate min-h-screen overflow-hidden', className)}
      {...props}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          alt="Painterly medieval city backdrop"
          className="object-cover opacity-60"
          fill
          priority
          sizes="100vw"
          src={SITE_BACKGROUND_PATH}
        />
      </div>
      <div className={SHELL_OVERLAY_CLASS} />
      <Box className="relative flex min-h-screen flex-col">
        <RootShellHeader />
        <main className="flex flex-1">{children}</main>
        <RootShellFooter />
      </Box>
    </div>
  )
}
