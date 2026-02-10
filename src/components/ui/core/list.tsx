import * as React from 'react'
import { cn } from '../../../lib/utils'

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
)
List.displayName = 'List'

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, icon, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'relative flex items-start gap-4 text-sm text-(--color-ivory)/90',
        className
      )}
      {...props}
    >
      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
        {icon || (
          <span className="h-1.5 w-1.5 rounded-sm bg-(--color-primary)/60" />
        )}
      </span>
      <span>{children}</span>
    </li>
  )
)
ListItem.displayName = 'ListItem'

export { List, ListItem }
