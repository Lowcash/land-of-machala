import clsx from 'clsx'

type RootShellFrameAs = 'div' | 'footer' | 'header' | 'section'
type RootShellFramePreset = 'center' | 'split'

export type RootShellFrameProps = {
  as?: RootShellFrameAs
  children: React.ReactNode
  className?: string
  preset?: RootShellFramePreset
}

const ROOT_SHELL_FRAME_CLASS = 'mx-auto w-full max-w-6xl'

const ROOT_SHELL_FRAME_PRESET_CLASS: Record<RootShellFramePreset, string> = {
  split: 'grid flex-1 items-center',
  center: 'flex flex-1 items-center justify-center',
}

export function RootShellFrame({ as = 'div', children, className, preset }: RootShellFrameProps) {
  const Component = as

  return (
    <Component
      className={clsx(
        ROOT_SHELL_FRAME_CLASS,
        preset && ROOT_SHELL_FRAME_PRESET_CLASS[preset],
        className
      )}
    >
      {children}
    </Component>
  )
}
