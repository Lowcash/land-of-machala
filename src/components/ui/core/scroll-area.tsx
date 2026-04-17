'use client'

import { type ElementType, type HTMLAttributes, forwardRef } from 'react'

import { useScrollArea } from '@/hooks/use-scroll-area'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Stack, type StackProps, splitLayoutProps } from './stack'

function assignViewportRef(ref: React.Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) {
  if (typeof ref === 'function') {
    ref(node)
    return
  }

  if (ref) {
    ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
  }
}

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
  } = restProps as {
    as?: ElementType
    className?: string
    viewportRef?: React.Ref<HTMLDivElement>
    [key: string]: unknown
  }

  const { scrollRef, setScrollNode, showTopArrow, showBottomArrow } = useScrollArea()

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
    p,
    pt,
    pb,
    px,
    py,
    sm,
    md,
    lg,
    xl,
  } = layoutProps

  const extractPaddingAndFlex = (bp: StackProps['sm']) => {
    if (!bp) return undefined
    return {
      p: bp.p,
      pt: bp.pt,
      pb: bp.pb,
      px: bp.px,
      py: bp.py,
      gap: bp.gap,
      direction: bp.direction,
      align: bp.align,
      justify: bp.justify,
      display: bp.display,
      cols: bp.cols,
      wrap: bp.wrap,
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
        ref={(node: HTMLDivElement) => {
          setScrollNode(node)
          assignViewportRef(viewportRef, node)
        }}
        className="scrollbar-custom flex min-h-0 w-full flex-1 overflow-y-auto"
        p={p ?? 'md'} // Default to 'md' but allow overrides
        pt={pt as StackProps['pt']}
        pb={pb as StackProps['pb']}
        px={px as StackProps['px']}
        py={py as StackProps['py']}
        gap={gap as StackProps['gap']}
        direction={direction as StackProps['direction']}
        align={align as StackProps['align']}
        justify={justify as StackProps['justify']}
        display={display as StackProps['display']}
        cols={cols as StackProps['cols']}
        wrap={wrap as StackProps['wrap']}
        sm={extractPaddingAndFlex(sm)}
        md={extractPaddingAndFlex(md)}
        lg={extractPaddingAndFlex(lg)}
        xl={extractPaddingAndFlex(xl)}
      >
        {children as React.ReactNode}
      </Stack>

      {showBottomArrow && (
        <div
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 left-0 z-40 flex h-12 items-end justify-center pb-2',
            showGradient ? 'bg-linear-to-t from-black/80 to-transparent' : undefined
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
