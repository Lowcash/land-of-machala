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
type RootShellFramePreset = 'auth-grid' | 'stage-center'

type RootShellFrameProps = {
  as?: RootShellFrameAs
  children: React.ReactNode
  className?: string
  inset?: RootShellFrameInset
  preset?: RootShellFramePreset
}

const ROOT_SHELL_FRAME_CLASS =
  'mx-auto w-full max-w-6xl px-(--space-shell-inset-x) md:px-(--space-shell-inset-x-lg)'

const ROOT_SHELL_FRAME_INSET_CLASS: Record<RootShellFrameInset, string> = {
  band: 'py-(--space-shell-band-y) md:py-(--space-shell-band-y-lg)',
  page: 'py-(--space-shell-page-y) md:py-(--space-shell-page-y-lg)',
  stage: 'py-(--space-shell-stage-y) md:py-(--space-shell-stage-y-lg)',
}

const ROOT_SHELL_FRAME_PRESET_CLASS: Record<RootShellFramePreset, string> = {
  'auth-grid':
    'grid flex-1 grid-cols-1 items-center gap-(--space-shell-grid-gap) lg:grid-cols-[1.08fr_0.92fr] lg:gap-(--space-shell-grid-gap-lg)',
  'stage-center': 'flex flex-1 items-center justify-center',
}

const SHELL_OVERLAY_CLASS =
  'from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br'

export function RootShellFrame({
  as = 'div',
  children,
  className,
  inset = 'page',
  preset,
}: RootShellFrameProps) {
  const Component = as

  return (
    <Component
      className={clsx(
        ROOT_SHELL_FRAME_CLASS,
        ROOT_SHELL_FRAME_INSET_CLASS[inset],
        preset && ROOT_SHELL_FRAME_PRESET_CLASS[preset],
        className
      )}
    >
      {children}
    </Component>
  )
}

function RootShellBase({ children, className = '', ...props }: RootShellProps) {
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

type RootShellComponent = typeof RootShellBase & {
  Frame: typeof RootShellFrame
}

export const RootShell: RootShellComponent = Object.assign(RootShellBase, {
  Frame: RootShellFrame,
})
