import clsx from 'clsx'

type StackAlign = 'center' | 'start' | 'stretch'
type StackAs = 'div' | 'form' | 'li' | 'section' | 'ul'
type StackJustify = 'between' | 'center' | 'start'

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

type StackProps = {
  align?: StackAlign
  as?: StackAs
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  justify?: StackJustify
  onSubmit?: (event: React.SyntheticEvent<HTMLFormElement>) => void
  resetList?: boolean
}

export function Stack({
  align = 'stretch',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
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
        STACK_JUSTIFY_CLASS[justify]
      )}
      onSubmit={onSubmit}
    >
      {children}
    </Component>
  )
}

type BoxAs = 'div' | 'li' | 'section'
type BoxTone = 'muted' | 'none' | 'panel' | 'surface'
type BoxBorderTone = 'default' | 'none' | 'strong'

const BOX_TONE_CLASS: Record<BoxTone, string> = {
  muted: 'bg-surface-container-low/40',
  panel: 'bg-surface-container-lowest/40',
  surface: 'bg-surface-container/40',
  none: '',
}

const BOX_BORDER_TONE_CLASS: Record<BoxBorderTone, string> = {
  default: 'border-outline-variant/40',
  strong: 'border-outline-variant/60',
  none: '',
}

type BoxProps = {
  as?: BoxAs
  border?: boolean
  borderTone?: BoxBorderTone
  children: React.ReactNode
  className?: string
  tone?: BoxTone
}

export function Box({
  as = 'div',
  border = false,
  borderTone = 'default',
  children,
  className = '',
  tone = 'none',
}: BoxProps) {
  const Component = as

  return (
    <Component
      className={clsx(
        className,
        BOX_TONE_CLASS[tone],
        border && 'border',
        border && BOX_BORDER_TONE_CLASS[borderTone]
      )}
    >
      {children}
    </Component>
  )
}
