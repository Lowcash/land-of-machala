import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'h-10 rounded-md border border-input focus:ring-offset-2',
        game: 'text-[#ffd700] rounded-lg border-2 border-[#8b6f47] bg-black/60 placeholder:text-[#8b7355] focus:border-[#ffd700] focus:ring-[#ffd700]/20 focus-visible:ring-0 focus-visible:ring-offset-0 font-fantasy',
        subtle:
          'text-[#ffd700] rounded-lg border border-[#8b6f47]/50 bg-black/40 placeholder:text-[#8b7355] focus:border-[#8b6f47] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-body',
      },
      inputSize: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-auto py-2.5 sm:py-3 text-sm sm:text-base',
        lg: 'h-auto py-3 sm:py-4 text-base sm:text-lg',
      },
      hasIcon: {
        true: 'pl-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'game',
      inputSize: 'default',
      hasIcon: false,
    },
  }
)

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean | string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, inputSize, hasIcon, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
            inputSize,
            hasIcon: !!hasIcon,
          }),
          error && 'border-red-500/50 bg-red-900/10 focus:border-red-500'
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { inputVariants }
