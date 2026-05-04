import clsx from 'clsx'

type RootShellFrameAs = 'div' | 'footer' | 'header' | 'section'
type RootShellFrameInset = 'band' | 'page' | 'stage'
type RootShellFramePreset = 'auth-grid' | 'stage-center'

export type RootShellFrameProps = {
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
    'grid flex-1 items-center gap-(--space-shell-grid-gap) lg:grid-cols-[1.08fr_0.92fr] lg:gap-(--space-shell-grid-gap-lg)',
  'stage-center': 'flex flex-1 items-center justify-center',
}

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
