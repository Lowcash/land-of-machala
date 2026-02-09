import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import { Loader } from './loader'

const buttonVariants = cva(
  'group flex items-center justify-center gap-3 font-fantasy text-sm shadow-lg shadow-black/40 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'w-full rounded-lg border-2 border-[#d4a574] bg-black/80 text-center text-[#ffd700] hover:scale-[1.02] hover:bg-[#d4a574]/20 disabled:border-[#8b6f47]/40 disabled:bg-[#8b6f47]/10 disabled:text-[#8b6f47]',
        secondary:
          'w-full rounded-lg border border-[#8b6f47]/40 bg-black/60 text-[#f8f5f2] hover:scale-[1.02] hover:border-[#f8f5f2]/40 hover:bg-white/10 hover:text-[#f8f5f2] disabled:border-[#8b6f47]/30 disabled:bg-[#8b6f47]/10 disabled:text-[#f8f5f2]/40',
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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

function Button({
  variant,
  size,
  asChild = false,
  loading = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const isActuallyDisabled = disabled || loading

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }))}
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

export { Button, buttonVariants }
