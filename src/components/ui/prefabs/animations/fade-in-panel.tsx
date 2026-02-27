'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { type VariantProps } from 'class-variance-authority'
import { animate } from 'framer-motion'

import { ScrollArea } from '@/components/ui/core/scroll-area'
import { Box } from '@/components/ui/core/box'
import { cardVariants } from '@/components/ui/core/card'
import { type StackProps } from '@/components/ui/core/stack'

export interface FadeInPanelProps extends Pick<StackProps, 'p' | 'gap'> {
  /**
   * The unique key that triggers a fade transition when it changes.
   * The card container (border, background) is always stable.
   * Only the scrollable content area fades in/out.
   */
  animationKey: string | number
  variant?: VariantProps<typeof cardVariants>['variant']
  flex?: string | number | boolean
  children?: React.ReactNode
}

const FADE_OUT_DURATION = 0.1
const FADE_IN_DURATION = 0.2

/**
 * An animated panel that combines Card styling, ScrollArea, and a Framer Motion fade.
 *
 * Architecture:
 * - Outer `Box` — permanently stable, holds the card border/background. Never animated.
 * - Inner `ScrollArea` — the fade target. Content swaps invisibly between fade steps.
 *
 * No extra motion.div needed: the imperative `animate()` runs directly on the
 * inner `ScrollArea` ref, so the DOM count stays minimal.
 */
export const FadeInPanel = forwardRef<HTMLElement, FadeInPanelProps>(
  ({ animationKey, flex, children, variant = 'subtle', p, gap }, ref) => {
    const contentRef = useRef<HTMLElement>(null)
    const isFirst = useRef(true)

    // Staged children — swapped after fade-out so the transition is invisible
    const [displayed, setDisplayed] = useState(children)

    useEffect(() => {
      const el = contentRef.current
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
      <Box
        ref={ref}
        className={cardVariants({ variant })}
        flex={flex as any}
        minHeight="zero"
        overflow="hidden"
      >
        <ScrollArea ref={contentRef} p={p ?? 'md'} gap={gap} minHeight="zero">
          {displayed}
        </ScrollArea>
      </Box>
    )
  }
)

FadeInPanel.displayName = 'FadeInPanel'
