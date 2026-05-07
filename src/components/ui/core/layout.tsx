import clsx from 'clsx'

type FlexAlign = 'center' | 'start' | 'stretch'
type FlexGap = 'base' | 'loose' | 'none' | 'tight'
type FlexJustify = 'between' | 'center' | 'start'
type ListAs = 'ul'

type StackAlign = FlexAlign
type StackAs = 'div' | 'form' | 'li' | 'section' | ListAs
type StackGap = FlexGap
type StackJustify = FlexJustify
type InlineAlign = FlexAlign
type InlineAs = 'div' | 'header' | 'li' | 'section' | 'span' | ListAs
type InlineGap = FlexGap
type InlineJustify = FlexJustify

type ResetListProp = {
  resetList?: boolean
}

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

const STACK_GAP_CLASS: Record<StackGap, string> = {
  none: '',
  tight: 'gap-(--gap-stack-sm)',
  base: 'gap-(--gap-stack-md)',
  loose: 'gap-(--gap-stack-lg)',
}

type StackProps = React.PropsWithChildren<{
  align?: StackAlign
  as?: StackAs
  className?: string
  fullWidth?: boolean
  gap?: StackGap
  justify?: StackJustify
  onSubmit?: (event: React.SyntheticEvent<HTMLFormElement>) => void
} & ResetListProp>

export function Stack({
  align = 'stretch',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
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
        STACK_GAP_CLASS[gap],
        STACK_JUSTIFY_CLASS[justify]
      )}
      onSubmit={onSubmit}
    >
      {children}
    </Component>
  )
}

type InlineProps = React.PropsWithChildren<{
  align?: InlineAlign
  as?: InlineAs
  className?: string
  fullWidth?: boolean
  gap?: InlineGap
  justify?: InlineJustify
  wrap?: boolean
} & ResetListProp>

export function Inline({
  align = 'center',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
  justify = 'start',
  resetList = false,
  wrap = false,
}: InlineProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'flex flex-row',
        as === 'ul' && resetList && 'm-0 list-none p-0',
        wrap && 'flex-wrap',
        className,
        fullWidth && 'w-full',
        STACK_ALIGN_CLASS[align],
        STACK_GAP_CLASS[gap],
        STACK_JUSTIFY_CLASS[justify]
      )}
    >
      {children}
    </Component>
  )
}

export { Box } from './box'
