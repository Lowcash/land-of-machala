import * as React from 'react'

import { StackProps, stackVariants } from './stack'

interface ListProps
  extends
    Omit<React.HTMLAttributes<HTMLUListElement>, 'className' | keyof StackProps>,
    StackProps {}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ display = 'flex', direction = 'col', gap = 'sm', ...props }, ref) => (
    <ul ref={ref} className={stackVariants({ display, direction, gap })} {...props} />
  )
)
List.displayName = 'List'

interface ListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'className'> {
  icon?: React.ReactNode
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, ...props }, ref) => (
    <li
      ref={ref}
      className="relative flex items-center gap-2 text-sm leading-relaxed text-(--color-ivory)/90"
      {...props}
    >
      <span className="flex flex-none items-center justify-center text-(--color-gold)">
        {icon || '•'}
      </span>
      <span>{children}</span>
    </li>
  )
)
ListItem.displayName = 'ListItem'

export { List, ListItem }
