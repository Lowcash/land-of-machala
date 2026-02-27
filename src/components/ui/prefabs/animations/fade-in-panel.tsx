'use client'

import { forwardRef } from 'react'

import { type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'

import { cardVariants } from '@/components/ui/core/card'
import { type StackProps } from '@/components/ui/core/stack'

import { MotionScrollArea } from './motion-scroll-area'

export interface FadeInPanelProps extends Pick<StackProps, 'p' | 'gap'> {
  /**
   * The unique key used by framer-motion to trigger the fade-in animation when content changes.
   * The container stays mounted; only the inner content fades.
   */
  animationKey: string | number
  variant?: VariantProps<typeof cardVariants>['variant']
  flex?: string | number | boolean
  children?: React.ReactNode
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/**
 * An animated panel that combines Card styling, ScrollArea, and Framer Motion fade.
 * The outer container stays stable (no key-driven unmount) while the inner content
 * fades in/out via AnimatePresence. This prevents layout flicker on selection changes.
 */
export const FadeInPanel = forwardRef<HTMLElement, FadeInPanelProps>(
  ({ animationKey, flex, children, variant = 'subtle', p, gap }, ref) => (
    <AnimatePresence mode="wait" initial={false}>
      <MotionScrollArea
        key={animationKey}
        ref={ref}
        className={cardVariants({ variant })}
        flex={flex as any}
        minHeight="zero"
        overflow="hidden"
        p={p ?? 'md'}
        gap={gap}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
      >
        {children}
      </MotionScrollArea>
    </AnimatePresence>
  )
)

FadeInPanel.displayName = 'FadeInPanel'
