import * as React from 'react'

import { cn } from '@/lib/utils'

interface RootShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * RootShell provides the base structural context for the application.
 * It enforces the full viewport height and consistent typography/antialiasing.
 * Used in the App Root (layout.tsx) and Storybook decorators.
 */
export function RootShell({ children, className, as: Component = 'div', ...props }: RootShellProps) {
  return (
    <Component
      className={cn(
        'font-body antialiased selection:bg-(--color-secondary)/30 selection:text-(--color-ivory)',
        'flex min-h-dvh flex-col',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
