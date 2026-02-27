'use client'

import React from 'react'

import { MotionScrollArea } from '@/components/ui/prefabs/animations/motion-scroll-area'

export interface FadeInPanelProps {
  /**
   * The unique key used by framer-motion to trigger the fade-in animation
   * when the content changes (e.g., when a new item is selected).
   */
  animationKey: string | number
  flex?: string | number
  children?: React.ReactNode
}

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
}

/**
 * A standard animated panel used for displaying changing detail content.
 * Bakes in `MotionScrollArea` inside a tinted, padded container (similar to `InfoPanel`).
 * Used primarily for master-detail views like Selection Details in Origins.
 */
export const FadeInPanel = React.forwardRef<HTMLDivElement, FadeInPanelProps>(
  ({ animationKey, flex, children }, ref) => {
    return (
      <MotionScrollArea
        ref={ref}
        flex={flex as any}
        fullWidth
        p="md"
        rounded="md"
        bgColor="black"
        // Animation props
        key={animationKey}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </MotionScrollArea>
    )
  }
)

FadeInPanel.displayName = 'FadeInPanel'
