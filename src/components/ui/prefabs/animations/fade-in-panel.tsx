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
   * The scroll container remains stable — only the content cross-fades.
   * This prevents layout jumps and scroll-position resets.
   */
  animationKey: string | number
  variant?: VariantProps<typeof cardVariants>['variant']
  flex?: string | number | boolean
  children?: React.ReactNode
}

const FADE_OUT_DURATION = 0.1
const FADE_IN_DURATION = 0.2

/**
 * An animated panel that combines Card styling, ScrollArea, and Framer Motion fade.
 *
 * Uses the imperative `animate()` API from Framer Motion to fade the container
 * without adding any extra DOM nodes. When `animationKey` changes:
 * 1. The container fades to opacity 0.
 * 2. The new `children` are swapped into state.
 * 3. The container fades back to opacity 1.
 */
export const FadeInPanel = forwardRef<HTMLElement, FadeInPanelProps>(
  ({ animationKey, flex, children, variant = 'subtle', p, gap }, ref) => {
    const containerRef = useRef<HTMLElement>(null)
    const isFirst = useRef(true)

    // Staged children — updated after fade-out so the swap is invisible
    const [displayed, setDisplayed] = useState(children)

    useEffect(() => {
      const el = containerRef.current
      if (!el) return

      if (isFirst.current) {
        isFirst.current = false
        return
      }

      animate(el, { opacity: 0 }, { duration: FADE_OUT_DURATION }).then(() => {
        setDisplayed(children)
        animate(el, { opacity: 1 }, { duration: FADE_IN_DURATION })
      })
      // Intentionally omitting `children` — we want this to run only
      // when the selection key changes, capturing the latest children at that moment.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationKey])

    return (
      <ScrollArea
        ref={(el) => {
          containerRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el
        }}
        className={cardVariants({ variant })}
        flex={flex as any}
        minHeight="zero"
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
