'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { type VariantProps } from 'class-variance-authority'
import { animate } from 'framer-motion'

import { ScrollArea } from '@/components/ui/core/scroll-area'
import { cardVariants } from '@/components/ui/core/card'
import { type StackProps } from '@/components/ui/core/stack'

export interface FadeInPanelProps extends Pick<StackProps, 'p' | 'gap'> {
  /**
   * The unique key that triggers a fade transition when it changes.
   * The card container (border, background) and scroll indicators stay stable.
   * Only the inner scrollable viewport content fades in/out.
   */
  animationKey: string | number
  variant?: VariantProps<typeof cardVariants>['variant']
  flex?: string | number | boolean
  children?: React.ReactNode
}

const FADE_OUT_DURATION = 0.1
const FADE_IN_DURATION = 0.2

/**
 * An animated panel that combines Card styling, ScrollArea, and a targeted fade.
 *
 * Architecture:
 * - Direct usage of `ScrollArea` (Card styling applied via className)
 * - Imperative `animate()` targets the `viewportRef` (the inner scrollable element)
 *
 * This results in exactly 2 divs:
 * 1. Wrapper (Card border, background, and absolute scroll arrows)
 * 2. Viewport (The actual scrollable element that fades)
 */
export const FadeInPanel = forwardRef<HTMLElement, FadeInPanelProps>(
  ({ animationKey, flex, children, variant = 'subtle', p, gap }, ref) => {
    const viewportRef = useRef<HTMLDivElement>(null)
    const isFirst = useRef(true)

    // Staged children — swapped after fade-out so the transition is invisible
    const [displayed, setDisplayed] = useState(children)

    useEffect(() => {
      const el = viewportRef.current
      if (!el) return

      if (isFirst.current) {
        isFirst.current = false
        return
      }

      animate(el, { opacity: 0 }, { duration: FADE_OUT_DURATION }).then(() => {
        setDisplayed(children)
        animate(el, { opacity: 1 }, { duration: FADE_IN_DURATION })
      })
      // Intentionally omitting `children` — fires only on selection key change,
      // capturing the latest children at that moment.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationKey])

    return (
      <ScrollArea
        ref={ref}
        viewportRef={viewportRef}
        className={cardVariants({ variant })}
        flex={flex as any}
        minHeight="zero"
        fullHeight
        overflow="hidden"
        p={p ?? 'md'}
        gap={gap}
      >
        {displayed}
      </ScrollArea>
    )
  }
)

FadeInPanel.displayName = 'FadeInPanel'
