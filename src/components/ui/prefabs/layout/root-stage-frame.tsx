import clsx from 'clsx'

type RootStageFrameAs = 'div' | 'footer' | 'header' | 'main' | 'section'
type RootStageFramePreset = 'center' | 'split'

export type RootStageFrameProps = React.PropsWithChildren<{
  as?: RootStageFrameAs
  preset?: RootStageFramePreset
}>

const ROOT_STAGE_FRAME_CLASS = 'mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8'

const ROOT_STAGE_FRAME_PRESET_CLASS: Record<RootStageFramePreset, string> = {
  split:
    'grid flex-1 items-start gap-(--gap-stack-lg) lg:grid-cols-2 lg:items-center lg:gap-(--inset-panel)',
  center: 'flex flex-1 items-center justify-center',
}

export function RootStageFrame({ as = 'main', children, preset }: RootStageFrameProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        ROOT_STAGE_FRAME_CLASS,
        preset && ROOT_STAGE_FRAME_PRESET_CLASS[preset],
        preset === 'split' && '[&>*:last-child]:lg:max-w-sm [&>*:last-child]:lg:justify-self-end'
      )}
    >
      {children}
    </Component>
  )
}
