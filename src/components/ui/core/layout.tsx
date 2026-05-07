import clsx from 'clsx'

type FlexAlign = 'center' | 'start' | 'stretch'
type FlexGap = 'base' | 'loose' | 'none' | 'tight'
type FlexJustify = 'between' | 'center' | 'start'

type StackAlign = FlexAlign
type StackAs = 'div' | 'form' | 'li' | 'section'
type StackGap = FlexGap
type StackJustify = FlexJustify
type InlineAlign = FlexAlign
type InlineAs = 'div' | 'header' | 'li' | 'section' | 'span'
type InlineGap = FlexGap
type InlineJustify = FlexJustify
type ListAs = 'ol' | 'ul'
type ListDirection = 'column' | 'row'
type GridAs = 'div' | 'section' | 'ul'
type GridColumns = 1 | 2 | 3 | 4

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

const GRID_COLUMNS_CLASS: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

const GRID_MD_COLUMNS_CLASS: Record<GridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

const GRID_XL_COLUMNS_CLASS: Record<GridColumns, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
}

type StackProps = React.PropsWithChildren<{
  align?: StackAlign
  as?: StackAs
  className?: string
  fullWidth?: boolean
  gap?: StackGap
  justify?: StackJustify
  onSubmit?: (event: React.SyntheticEvent<HTMLFormElement>) => void
}>

export function Stack({
  align = 'stretch',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
  justify = 'start',
  onSubmit,
}: StackProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'flex flex-col',
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
}>

export function Inline({
  align = 'center',
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
  justify = 'start',
  wrap = false,
}: InlineProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'flex flex-row',
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

type ListProps = React.PropsWithChildren<{
  align?: FlexAlign
  as?: ListAs
  className?: string
  direction?: ListDirection
  fullWidth?: boolean
  gap?: FlexGap
  justify?: FlexJustify
  wrap?: boolean
}>

function ListBase({
  align = 'stretch',
  as = 'ul',
  children,
  className = '',
  direction = 'column',
  fullWidth = false,
  gap = 'base',
  justify = 'start',
  wrap = false,
}: ListProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'm-0 flex list-none p-0',
        direction === 'row' ? 'flex-row' : 'flex-col',
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

type ListItemProps = React.PropsWithChildren<{
  className?: string
}>

function ListItem({ children, className }: ListItemProps) {
  return <li className={className}>{children}</li>
}

export const List = Object.assign(ListBase, { Item: ListItem })

type GridProps = React.PropsWithChildren<{
  as?: GridAs
  className?: string
  columns?: GridColumns
  fullWidth?: boolean
  gap?: FlexGap
  mdColumns?: GridColumns
  xlColumns?: GridColumns
}>

export function Grid({
  as = 'div',
  children,
  className = '',
  columns = 1,
  fullWidth = false,
  gap = 'base',
  mdColumns,
  xlColumns,
}: GridProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'grid',
        as === 'ul' && 'm-0 list-none p-0',
        className,
        fullWidth && 'w-full',
        STACK_GAP_CLASS[gap],
        GRID_COLUMNS_CLASS[columns],
        mdColumns && GRID_MD_COLUMNS_CLASS[mdColumns],
        xlColumns && GRID_XL_COLUMNS_CLASS[xlColumns]
      )}
    >
      {children}
    </Component>
  )
}
