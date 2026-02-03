'use client'

import * as React from 'react'
import { useRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

import { ScrollIndicator } from '@/components/ui/scroll-indicator'

interface ScrollAreaProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  'className'
> {
  showIndicators?: boolean
}

export function ScrollArea({
  children,
  showIndicators = true,
  ref,
  ...props
}: ScrollAreaProps & { ref?: React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.Root>> }) {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className="relative h-full w-full overflow-hidden"
      {...props}
    >
      {showIndicators && (
        <ScrollIndicator targetRef={viewportRef as React.RefObject<HTMLElement>} position="both" />
      )}
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className="h-full w-full rounded-[inherit] hover:cursor-auto"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

export function ScrollBar({
  orientation = 'vertical',
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  'className'
> & {
  ref?: React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-transparent p-px',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-transparent p-px'
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full dark:bg-slate-700" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}
