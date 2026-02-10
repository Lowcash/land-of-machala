import * as React from 'react'

import { cn } from '@/lib/utils'

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
  )
)
List.displayName = 'List'

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'relative flex items-center gap-2 text-sm leading-relaxed text-(--color-ivory)/90',
        className
      )}
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
