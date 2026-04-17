'use client'

import { type HTMLAttributes, forwardRef } from 'react'

import { type HTMLMotionProps, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { getBoxClasses } from '../box'
import { type StackProps, getStackClasses, splitLayoutProps } from '../stack'

// Omit potentially conflicting HTML attributes from StackProps since HTMLMotionProps already provides them.
export interface MotionStackProps
  extends
    Omit<HTMLMotionProps<'div'>, 'style' | 'className'>,
    Omit<StackProps, 'as' | keyof HTMLAttributes<HTMLElement>> {}

/**
 * A layout component that combines the power of Stack with Framer Motion.
 * Use this to avoid inline styles or classNames for layout animations.
 */
export const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const motionProps = restProps as HTMLMotionProps<'div'> & { className?: string }

  // LayoutProps does not include the generic 'className' or 'style', so we pass it explicitly if needed
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        getBoxClasses(layoutProps),
        getStackClasses(layoutProps as StackProps),
        motionProps.className
      )}
      {...motionProps}
    />
  )
})

MotionStack.displayName = 'MotionStack'

export const MotionHStack = forwardRef<HTMLDivElement, Omit<MotionStackProps, 'direction'>>(
  (props, ref) => <MotionStack ref={ref} direction="row" {...props} />
)
MotionHStack.displayName = 'MotionHStack'

export const MotionVStack = forwardRef<HTMLDivElement, Omit<MotionStackProps, 'direction'>>(
  (props, ref) => <MotionStack ref={ref} direction="col" {...props} />
)
MotionVStack.displayName = 'MotionVStack'
