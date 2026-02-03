import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { HStack } from './stack'
import { Span } from './typography'

const statusMessageVariants = cva(
  'flex items-center justify-center gap-2 rounded py-2 sm:py-3 border px-4',
  {
    variants: {
      variant: {
        default: 'border-[#8b6f47]/50 bg-[#8b6f47]/10 text-[#d4a574]',
        success: 'border-[#6fbf6f]/50 bg-[#6fbf6f]/10 text-[#6fbf6f]',
        danger: 'border-[#ff6b6b]/50 bg-[#ff6b6b]/10 text-[#ff6b6b]',
        warning: 'border-[#ffd700]/50 bg-[#ffd700]/10 text-[#ffd700]',
        info: 'border-[#69ccf0]/50 bg-[#69ccf0]/10 text-[#69ccf0]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface StatusMessageProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusMessageVariants> {
  icon?: React.ElementType
}

export function StatusMessage({
  className,
  variant,
  icon: Icon,
  children,
  ...props
}: StatusMessageProps) {
  return (
    <HStack
      align="center"
      justify="center"
      gap="sm"
      _internalClassName={cn(statusMessageVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <Span
        color={
          variant === 'default'
            ? 'copper'
            : variant === 'warning'
              ? 'gold'
              : variant === 'info'
                ? 'cold'
                : (variant as 'success' | 'danger')
        }
      >
        {children}
      </Span>
    </HStack>
  )
}
