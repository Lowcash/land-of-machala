'use client'

import { type ElementType, type HTMLAttributes, forwardRef } from 'react'

import { useScrollArea } from '@/hooks/use-scroll-area'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Stack, type StackProps, splitLayoutProps } from './stack'

export interface ScrollAreaProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof StackProps | 'color'>, StackProps {
  children: React.ReactNode
  showGradient?: boolean
  /** Optional ref to the inner scrolling viewport element */
  viewportRef?: React.Ref<HTMLDivElement>
}

export const ScrollArea = forwardRef<HTMLElement, ScrollAreaProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    children,
    showGradient = true,
    viewportRef,
    className,
    as: Component = 'div',
    ...otherProps
  } = restProps as { as?: ElementType; [key: string]: unknown }

  const { scrollRef, showTopArrow, showBottomArrow } = useScrollArea()

  // Extract ONLY flex and alignment properties for the inner scroll container.
  // We leave padding on the outer component so it handles its own styling correctly.
  const {
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
  } = layoutProps as Record<string, unknown>

  const extractFlex = (bp: unknown) => {
    const config = bp as StackProps | undefined
    if (!config) return undefined
    return {
      gap: config.gap,
      direction: config.direction,
      align: config.align,
      justify: config.justify,
      display: (config.display as StackProps['display']) ?? undefined,
      cols: config.cols,
      wrap: config.wrap,
    }
  }

  return (
    <Stack
      as={Component as ElementType}
      ref={ref}
      className={cn('relative overflow-hidden', className as string)}
      {...layoutProps}
      p="none" // Remove padding from outer wrapper
      direction="col"
      {...otherProps}
    >
      {showTopArrow && (
        <div
          className={cn(
            'pointer-events-none absolute top-0 right-0 left-0 z-40 flex h-12 items-start justify-center pt-3',
            showGradient ? 'bg-linear-to-b from-black/80 to-transparent' : undefined
          ) as any}
        >
          <ChevronUp
            className="animate-bounce text-(--color-gold) drop-shadow-md"
            size={16}
            strokeWidth={3}
          />
        </div>
      )}

      <Stack
        ref={(node: HTMLDivElement) => {
          scrollRef.current = node
          if (typeof viewportRef === 'function') viewportRef(node)
          else if (viewportRef)
            (viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className="scrollbar-custom flex min-h-0 w-full flex-1 overflow-y-auto"
        p={layoutProps.p ?? 'md'} // Apply padding here instead
        gap={gap as StackProps['gap']}
        direction={direction as StackProps['direction']}
        align={align as StackProps['align']}
        justify={justify as StackProps['justify']}
        display={display as StackProps['display']}
        cols={cols as StackProps['cols']}
        wrap={wrap as StackProps['wrap']}
        sm={extractFlex(sm) as any}
        md={extractFlex(md) as any}
        lg={extractFlex(lg) as any}
        xl={extractFlex(xl) as any}
      >
        {children as React.ReactNode}
      </Stack>

      {showBottomArrow && (
        <div
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 left-0 z-40 flex h-12 items-end justify-center pb-2',
            showGradient ? 'bg-linear-to-t from-black/80 to-transparent' : undefined
          ) as any}
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
