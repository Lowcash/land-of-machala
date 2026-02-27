'use client'

import { forwardRef } from 'react'

import { motion } from 'framer-motion'

import { ScrollArea, type ScrollAreaProps } from '@/components/ui/core/scroll-area'

/**
 * A reusable ScrollArea component wrapped with Framer Motion.
 * Useful for entrance animations that need to reset scroll state via 'key'.
 */
export const MotionScrollArea = motion(
  forwardRef<HTMLElement, ScrollAreaProps>((props, ref) => {
    const { children, ...rest } = props
    return (
      <ScrollArea ref={ref} {...rest}>
        {children}
      </ScrollArea>
    )
  })
)

MotionScrollArea.displayName = 'MotionScrollArea'
