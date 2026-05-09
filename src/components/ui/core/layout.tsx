import clsx from 'clsx'

type FlexAlign = 'center' | 'start' | 'stretch'
type FlexGap = 'base' | 'loose' | 'none' | 'tight'
type FlexJustify = 'between' | 'center' | 'start'

const FLEX_ALIGN_CLASS: Record<FlexAlign, string> = {
  center: 'items-center',
  start: 'items-start',
  stretch: 'items-stretch',
}

const FLEX_JUSTIFY_CLASS: Record<FlexJustify, string> = {
  between: 'justify-between',
  center: 'justify-center',
  start: 'justify-start',
}

const FLEX_GAP_CLASS: Record<FlexGap, string> = {
  none: '',
  tight: 'gap-(--gap-stack-sm)',
  base: 'gap-(--gap-stack-md)',
  loose: 'gap-(--gap-stack-lg)',
}

type StackAs = 'div' | 'form' | 'li' | 'section'

type StackProps = React.PropsWithChildren<{
  align?: FlexAlign
  as?: StackAs
  className?: string
  fullWidth?: boolean
  gap?: FlexGap
  justify?: FlexJustify
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
        FLEX_ALIGN_CLASS[align],
        FLEX_GAP_CLASS[gap],
        FLEX_JUSTIFY_CLASS[justify]
      )}
      onSubmit={onSubmit}
    >
      {children}
    </Component>
  )
}

type InlineAs = 'div' | 'header' | 'li' | 'section' | 'span'

type InlineProps = React.PropsWithChildren<{
  align?: FlexAlign
  as?: InlineAs
  className?: string
  fullWidth?: boolean
  gap?: FlexGap
  justify?: FlexJustify
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
        FLEX_ALIGN_CLASS[align],
        FLEX_GAP_CLASS[gap],
        FLEX_JUSTIFY_CLASS[justify]
      )}
    >
      {children}
    </Component>
  )
}

type ListAs = 'ol' | 'ul'
type ListDirection = 'column' | 'row'

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
        FLEX_ALIGN_CLASS[align],
        FLEX_GAP_CLASS[gap],
        FLEX_JUSTIFY_CLASS[justify]
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

type GridAs = 'div' | 'section' | 'ul'
type GridColumns = 1 | 2 | 3 | 4

type GridProps = React.PropsWithChildren<{
  as?: GridAs
  className?: string
  columns?: GridColumns
  fullWidth?: boolean
  gap?: FlexGap
  mdColumns?: GridColumns
  xlColumns?: GridColumns
}>

const GRID_COLUMNS_CLASS: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

const GRID_COLUMNS_MD_CLASS: Record<GridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

const GRID_COLUMNS_XL_CLASS: Record<GridColumns, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
}

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
        FLEX_GAP_CLASS[gap],
        GRID_COLUMNS_CLASS[columns],
        mdColumns && GRID_COLUMNS_MD_CLASS[mdColumns],
        xlColumns && GRID_COLUMNS_XL_CLASS[xlColumns]
      )}
    >
      {children}
    </Component>
  )
}
