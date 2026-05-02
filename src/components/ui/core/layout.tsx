type StackAlign = 'center' | 'start' | 'stretch'
type StackJustify = 'between' | 'center' | 'start'
type StackSpace = '2' | '3' | '4' | '6' | '8'

const STACK_ALIGN_CLASS: Record<StackAlign, string> = {
  center: 'items-center',
  start: 'items-start',
  stretch: 'items-stretch',
}

const STACK_JUSTIFY_CLASS: Record<StackJustify, string> = {
  between: 'justify-between',
  center: 'justify-center',
  start: 'justify-start',
}

const STACK_SPACE_CLASS: Record<StackSpace, string> = {
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
}

type StackProps = {
  align?: StackAlign
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  gap?: StackSpace
  justify?: StackJustify
  space?: StackSpace
}

export function Stack({
  align = 'stretch',
  children,
  className = '',
  fullWidth = false,
  gap,
  justify = 'start',
  space = '4',
}: StackProps) {
  const resolvedGap = gap ?? space

  return (
    <div
      className={[
        'flex flex-col',
        className,
        fullWidth ? 'w-full' : '',
        STACK_ALIGN_CLASS[align],
        STACK_JUSTIFY_CLASS[justify],
        STACK_SPACE_CLASS[resolvedGap],
      ].join(' ')}
    >
      {children}
    </div>
  )
}

type BoxPadding = 'lg' | 'md' | 'none' | 'sm'
type BoxRadius = 'lg' | 'none' | 'xl'
type BoxTone = 'muted' | 'none' | 'panel' | 'surface'
type BoxBorderTone = 'default' | 'none' | 'strong'

const BOX_PADDING_CLASS: Record<BoxPadding, string> = {
  lg: 'p-5',
  md: 'p-4',
  none: '',
  sm: 'p-3',
}

const BOX_RADIUS_CLASS: Record<BoxRadius, string> = {
  lg: 'rounded-lg',
  none: '',
  xl: 'rounded-xl',
}

const BOX_TONE_CLASS: Record<BoxTone, string> = {
  muted: 'bg-surface-container-low/40',
  none: '',
  panel: 'bg-surface-container-lowest/40',
  surface: 'bg-surface-container/40',
}

const BOX_BORDER_TONE_CLASS: Record<BoxBorderTone, string> = {
  default: 'border-outline-variant/40',
  none: '',
  strong: 'border-outline-variant/60',
}

type BoxProps = {
  border?: boolean
  borderTone?: BoxBorderTone
  children: React.ReactNode
  className?: string
  padding?: BoxPadding
  radius?: BoxRadius
  tone?: BoxTone
}

export function Box({
  border = false,
  borderTone = 'default',
  children,
  className = '',
  padding = 'none',
  radius = 'none',
  tone = 'none',
}: BoxProps) {
  return (
    <div
      className={[
        className,
        BOX_PADDING_CLASS[padding],
        BOX_RADIUS_CLASS[radius],
        BOX_TONE_CLASS[tone],
        border ? ['border', BOX_BORDER_TONE_CLASS[borderTone]].join(' ') : '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}
