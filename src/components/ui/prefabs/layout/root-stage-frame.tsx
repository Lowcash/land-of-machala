import clsx from 'clsx'

type RootStageFrameAs = 'div' | 'footer' | 'header' | 'section'
type RootStageFramePreset = 'center' | 'split'

export type RootStageFrameProps = React.PropsWithChildren<{
  as?: RootStageFrameAs
  preset?: RootStageFramePreset
}>

const ROOT_STAGE_FRAME_CLASS = 'mx-auto w-full'

const ROOT_STAGE_FRAME_PRESET_CLASS: Record<RootStageFramePreset, string> = {
  split: 'grid flex-1 items-center',
  center: 'flex flex-1 items-center justify-center',
}

export function RootStageFrame({ as = 'div', children, preset }: RootStageFrameProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(ROOT_STAGE_FRAME_CLASS, preset && ROOT_STAGE_FRAME_PRESET_CLASS[preset])}
    >
      {children}
    </Component>
  )
}
