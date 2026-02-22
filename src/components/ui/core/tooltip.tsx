'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md border border-(--color-secondary)/40 bg-black/90 px-3 py-1.5 text-xs text-(--color-ivory) shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 backdrop-blur-md max-w-[280px] sm:max-w-xs',
  {
    variants: {
      variant: {
        default: 'bg-black/90 backdrop-blur-md border border-(--color-secondary)/40 rounded-md shadow-xl',
        ornamental: 'bg-black/95 backdrop-blur-lg border-2 border-(--color-secondary) rounded-lg shadow-[0_0_15px_rgba(var(--color-secondary-rgb),0.3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & 
  VariantProps<typeof tooltipContentVariants>
>(({ className, variant, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  content: React.ReactNode
  variant?: VariantProps<typeof tooltipContentVariants>['variant']
  side?: TooltipPrimitive.TooltipContentProps['side']
  align?: TooltipPrimitive.TooltipContentProps['align']
  className?: string
}

export function Tooltip({
  children,
  content,
  variant,
  side = 'top',
  align = 'center',
  className,
  ...props
}: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot {...props}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            variant={variant}
            side={side}
            align={align}
            className={className}
          >
            {content}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  )
}
