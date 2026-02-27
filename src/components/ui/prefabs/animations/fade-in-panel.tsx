'use client'

import { forwardRef } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { cardVariants } from '@/components/ui/core/card'
import { type StackProps } from '@/components/ui/core/stack'

import { MotionScrollArea } from './motion-scroll-area'

export interface FadeInPanelProps extends Pick<StackProps, 'p' | 'gap'> {
  /**
   * The unique key used by framer-motion to trigger the fade-in animation when content changes.
   */
  animationKey: string | number
  variant?: VariantProps<typeof cardVariants>['variant']
  flex?: string | number | boolean
  children?: React.ReactNode
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

/**
 * An animated panel that combines Card styling, ScrollArea, and Framer Motion fade
 * into a single DOM element. Uses MotionScrollArea as a decorator to avoid wrapper divs.
 */
export const FadeInPanel = forwardRef<HTMLElement, FadeInPanelProps>(
  ({ animationKey, flex, children, variant = 'subtle', p, gap }, ref) => (
    <MotionScrollArea
      ref={ref}
      key={animationKey}
      className={cardVariants({ variant })}
      flex={flex as any}
      minHeight="zero"
      overflow="hidden"
      p={p ?? 'md'}
      gap={gap}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeVariants}
    >
      {children}
    </MotionScrollArea>
  )
)

FadeInPanel.displayName = 'FadeInPanel'
