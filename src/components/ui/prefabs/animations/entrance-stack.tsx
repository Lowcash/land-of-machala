'use client'

import { forwardRef } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { getBoxClasses } from '@/components/ui/core/box'
import { type StackProps, getStackClasses, splitLayoutProps } from '@/components/ui/core/stack'

interface EntranceStackProps extends StackProps {
  /**
   * Animation delay in seconds
   */
  delay?: number
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Initial Y offset
   */
  yOffset?: number
}

const variants = {
  hidden: (custom: { yOffset: number }) => ({
    opacity: 0,
    y: custom.yOffset,
  }),
  visible: (custom: { duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration,
      ease: 'easeOut',
    } as any,
  }),
  exit: (custom: { yOffset: number }) => ({
    opacity: 0,
    y: -custom.yOffset,
    transition: {
      duration: 0.2,
    },
  }),
}

export const EntranceStack = forwardRef<HTMLElement, EntranceStackProps>(
  ({ children, delay = 0, duration = 0.6, yOffset = 0, ...props }, ref) => {
    const { layoutProps, restProps } = splitLayoutProps(props)

    // We use motion.div as the base but apply Stack classes to it
    // to avoid extra DOM nesting while keeping the Stack API
    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        custom={{ yOffset, duration }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        className={cn(getBoxClasses(layoutProps as any), getStackClasses(layoutProps as StackProps))}
        {...(restProps as HTMLMotionProps<'div'>)}
      >
        {children}
      </motion.div>
    )
  }
)

EntranceStack.displayName = 'EntranceStack'
