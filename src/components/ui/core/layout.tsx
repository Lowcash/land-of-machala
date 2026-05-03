import clsx from 'clsx'

type StackAlign = 'center' | 'start' | 'stretch'
type StackAs = 'div' | 'form' | 'li' | 'section' | 'ul'
type StackJustify = 'between' | 'center' | 'start'

export type SpaceToken = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type StackSpace = SpaceToken

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
  sm: 'gap-(--space-stack-sm)',
  md: 'gap-(--space-stack-md)',
  lg: 'gap-(--space-stack-lg)',
  xl: 'gap-(--space-stack-xl)',
  xxl: 'gap-(--space-stack-xxl)',
}

type StackProps = {
  align?: StackAlign
  as?: StackAs
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  gap?: StackSpace
  justify?: StackJustify
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  resetList?: boolean
}

export function Stack({
  align = 'stretch',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'lg',
  justify = 'start',
  onSubmit,
  resetList = false,
}: StackProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'flex flex-col',
        as === 'ul' && resetList && 'm-0 list-none p-0',
        className,
        fullWidth && 'w-full',
        STACK_ALIGN_CLASS[align],
        STACK_JUSTIFY_CLASS[justify],
        STACK_SPACE_CLASS[gap]
      )}
      onSubmit={onSubmit}
    >
      {children}
    </Component>
  )
}

type BoxPadding = 'md' | 'none' | 'sm'
type BoxRadius = 'lg' | 'none' | 'xl'
type BoxAs = 'div' | 'li' | 'section'
type BoxTone = 'muted' | 'none' | 'panel' | 'surface'
type BoxBorderTone = 'default' | 'none' | 'strong'

const BOX_PADDING_CLASS: Record<BoxPadding, string> = {
  md: 'p-(--space-pad-md)',
  none: '',
  sm: 'p-(--space-pad-sm)',
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
  as?: BoxAs
  border?: boolean
  borderTone?: BoxBorderTone
  children: React.ReactNode
  className?: string
  padding?: BoxPadding
  radius?: BoxRadius
  tone?: BoxTone
}

export function Box({
  as = 'div',
  border = false,
  borderTone = 'default',
  children,
  className = '',
  padding = 'none',
  radius = 'none',
  tone = 'none',
}: BoxProps) {
  const Component = as

  return (
    <Component
      className={clsx(
        className,
        BOX_PADDING_CLASS[padding],
        BOX_RADIUS_CLASS[radius],
        BOX_TONE_CLASS[tone],
        border && 'border',
        border && BOX_BORDER_TONE_CLASS[borderTone]
      )}
    >
      {children}
    </Component>
  )
}
