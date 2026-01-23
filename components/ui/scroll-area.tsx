'use client'

import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { cn } from '@/lib/utils'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import * as React from 'react'
import { useRef } from 'react'

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  viewportClassName?: string
  showIndicators?: boolean
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, viewportClassName, showIndicators = true, ...props }, ref) => {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {showIndicators && <ScrollIndicator targetRef={viewportRef} position="both" />}
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn('h-full w-full rounded-[inherit] hover:cursor-auto', viewportClassName)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none transition-colors select-none',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-transparent p-px',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-transparent p-px',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full dark:bg-slate-700" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
