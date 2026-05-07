import clsx from 'clsx'

type BoxAs = 'div' | 'li' | 'section'
type BoxTone = 'muted' | 'none' | 'panel' | 'surface'
type BoxBorderTone = 'default' | 'none' | 'strong'
type BoxPadding = 'none' | 'panel'
type BoxRadius = 'compact' | 'control' | 'none' | 'panel'

const BOX_TONE_CLASS: Record<BoxTone, string> = {
  none: '',
  muted: 'bg-surface-container-low/40',
  panel: 'bg-surface-container-lowest/40',
  surface: 'bg-surface-container/40',
}

const BOX_BORDER_TONE_CLASS: Record<BoxBorderTone, string> = {
  none: '',
  default: 'border-outline-variant/40',
  strong: 'border-outline-variant/60',
}

const BOX_PADDING_CLASS: Record<BoxPadding, string> = {
  none: '',
  panel: 'p-(--inset-panel)',
}

const BOX_RADIUS_CLASS: Record<BoxRadius, string> = {
  none: '',
  compact: 'rounded-compact',
  control: 'rounded-control',
  panel: 'rounded-panel',
}

type BoxProps = React.PropsWithChildren<{
  as?: BoxAs
  border?: boolean
  borderTone?: BoxBorderTone
  className?: string
  fullHeight?: boolean
  padding?: BoxPadding
  radius?: BoxRadius
  tone?: BoxTone
}>

export function Box({
  as = 'div',
  border = false,
  borderTone = 'default',
  children,
  className = '',
  fullHeight = false,
  padding = 'none',
  radius = 'none',
  tone = 'none',
}: BoxProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        className,
        fullHeight && 'h-full',
        BOX_TONE_CLASS[tone],
        BOX_PADDING_CLASS[padding],
        BOX_RADIUS_CLASS[radius],
        border && 'border',
        border && BOX_BORDER_TONE_CLASS[borderTone]
      )}
    >
      {children}
    </Component>
  )
}