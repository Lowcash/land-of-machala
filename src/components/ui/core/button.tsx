import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { Loader } from './loader'

const buttonVariants = cva(
  'group cursor-pointer flex items-center justify-center gap-3 font-fantasy text-sm shadow-lg shadow-black/40 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'rounded-lg border-2 border-(--color-primary) bg-black/80 text-center text-(--color-primary) enabled:hover:scale-[0.99] enabled:hover:bg-(--color-primary)/20 disabled:border-(--color-secondary)/40 disabled:bg-(--color-secondary)/10 disabled:text-(--color-secondary)',
        secondary:
          'rounded-lg border border-(--color-secondary)/40 bg-black/60 text-(--color-ivory) enabled:hover:scale-[0.99] enabled:hover:border-(--color-ivory)/40 enabled:hover:bg-black/80 enabled:hover:text-(--color-primary) disabled:border-(--color-secondary)/30 disabled:bg-(--color-secondary)/10 disabled:text-(--color-ivory)/40',
        choice:
          'flex-col items-center justify-center rounded-lg border border-(--color-secondary)/40 bg-black/60 p-4 text-center text-(--color-ivory) enabled:hover:scale-[0.99] enabled:hover:border-(--color-primary) enabled:hover:bg-(--color-primary)/10 disabled:opacity-50 disabled:border-(--color-secondary)/20 disabled:bg-black/40 disabled:text-(--color-ivory)/40',
      },
      size: {
        default: 'p-2',
        lg: 'min-h-16 p-4',
        action: 'min-h-20 p-4 py-6',
        feature: 'h-20 p-4',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: true,
    },
  }
)

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
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
        className={buttonVariants({ variant, size, fullWidth })}
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
