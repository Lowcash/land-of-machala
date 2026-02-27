'use client'

import { type HTMLAttributes, forwardRef } from 'react'

import { useScrollArea } from '@/hooks/use-scroll-area'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Stack, type StackProps, splitLayoutProps } from './stack'

export interface ScrollAreaProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof StackProps | 'color'>, StackProps {
  children: React.ReactNode
  showGradient?: boolean
}

export const ScrollArea = forwardRef<HTMLElement, ScrollAreaProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    children,
    showGradient = true,
    className,
    as: Component = 'div',
    ...otherProps
  } = restProps as any

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
  } = layoutProps as any

  const extractFlex = (bp: any) =>
    bp
      ? {
          gap: bp.gap,
          direction: bp.direction,
          align: bp.align,
          justify: bp.justify,
          display: bp.display,
          cols: bp.cols,
          wrap: bp.wrap,
        }
      : undefined

  return (
    <Stack
      as={Component as any}
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...layoutProps} // Outer wrapper receives ALL layout props including padding
      direction="col" // Force standard column to align absolute arrows
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
        className="scrollbar-custom flex min-h-0 w-full flex-1 overflow-y-auto"
        p="none" // No padding here. Card/outer handles it.
        gap={gap}
        direction={direction}
        align={align}
        justify={justify}
        display={display}
        cols={cols}
        wrap={wrap}
        sm={extractFlex(sm)}
        md={extractFlex(md)}
        lg={extractFlex(lg)}
        xl={extractFlex(xl)}
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
