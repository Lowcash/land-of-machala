import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../../lib/utils'
import { Loader } from './loader'

const buttonVariants = cva(
  'group flex items-center justify-center gap-3 font-fantasy text-sm shadow-lg shadow-black/40 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'w-full rounded-lg border-2 border-[var(--color-primary)] bg-black/80 text-center text-[var(--color-primary)] hover:scale-[1.02] hover:bg-[var(--color-primary)]/20 disabled:border-[var(--color-secondary)]/40 disabled:bg-[var(--color-secondary)]/10 disabled:text-[var(--color-secondary)]',
        secondary:
          'w-full rounded-lg border border-[var(--color-secondary)]/40 bg-black/60 text-[var(--color-ivory)] hover:scale-[1.02] hover:border-[var(--color-ivory)]/40 hover:bg-black/80 hover:text-[var(--color-primary)] disabled:border-[var(--color-secondary)]/30 disabled:bg-[var(--color-secondary)]/10 disabled:text-[var(--color-ivory)]/40',
      },
      size: {
        default: 'p-2',
        lg: 'min-h-16 p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isActuallyDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isActuallyDisabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader />
            {children}
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
