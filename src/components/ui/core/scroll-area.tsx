'use client'

import React from 'react'

import { useScrollArea } from '@/hooks/use-scroll-area'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Stack, type StackProps, splitLayoutProps } from './stack'

interface ScrollAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof StackProps | 'color'>, StackProps {
  children: React.ReactNode
  showGradient?: boolean
  isFlexible?: boolean
}

export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    children,
    showGradient = true,
    isFlexible,
    className,
    as: Component = 'div',
    ...otherProps
  } = restProps as any

  const { scrollRef, showTopArrow, showBottomArrow } = useScrollArea()

  // Layout props go to the inner scroll container to manage content layout
  const {
    p,
    pt,
    pb,
    px,
    py,
    gap,
    direction = 'col',
    align = 'stretch',
    justify,
    display,
    cols,
    wrap,
    sm,
    md,
    lg,
    xl,
    ...outerLayoutProps
  } = layoutProps as any

  return (
    <Stack
      as={Component as any}
      ref={ref}
      className={cn('relative overflow-hidden', isFlexible ? 'flex-1' : 'flex-none', className)}
      style={{
        flex: isFlexible ? '1 1 0%' : undefined,
      }}
      p="none" // Outer wrapper loses padding so scrollbar hugs edge
      direction="col" // Outer wrapper is always column so arrow stack correctly
      {...outerLayoutProps}
      {...otherProps}
    >
      {showTopArrow && (
        <div
          className={cn(
            'pointer-events-none absolute top-0 right-0 left-0 z-40 flex h-12 items-start justify-center pt-3',
            showGradient && 'bg-linear-to-b from-black/80 to-transparent'
          )}
        >
          <ChevronUp
            className="animate-bounce text-(--color-gold) drop-shadow-md"
            size={16}
            strokeWidth={3}
          />
        </div>
      )}

      <Stack
        ref={scrollRef as any}
        className="scrollbar-custom inline-flex min-h-0 flex-1 overflow-y-auto" // Enforce flex
        p={p}
        pt={pt}
        pb={pb}
        px={px}
        py={py}
        gap={gap}
        direction={direction}
        align={align}
        justify={justify}
        display={display}
        cols={cols}
        wrap={wrap}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
      >
        {children}
      </Stack>

      {showBottomArrow && (
        <div
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 left-0 z-40 flex h-12 items-end justify-center pb-2',
            showGradient && 'bg-linear-to-t from-black/80 to-transparent'
          )}
        >
          <ChevronDown
            className="animate-bounce text-(--color-gold) drop-shadow-md"
            size={16}
            strokeWidth={3}
          />
        </div>
      )}
    </Stack>
  )
})

ScrollArea.displayName = 'ScrollArea'
