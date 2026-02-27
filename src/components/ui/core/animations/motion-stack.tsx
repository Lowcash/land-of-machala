'use client'

import { type HTMLAttributes, forwardRef } from 'react'

import { type HTMLMotionProps, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { type StackProps, getResponsiveClasses, stackVariants } from '../stack'

// Omit potentially conflicting HTML attributes from StackProps since HTMLMotionProps already provides them.
export interface MotionStackProps
  extends
    Omit<HTMLMotionProps<'div'>, 'style' | 'className'>,
    Omit<StackProps, 'as' | keyof HTMLAttributes<HTMLElement>> {}

/**
 * A layout component that combines the power of Stack with Framer Motion.
 * Use this to avoid inline styles or classNames for layout animations.
 */
export const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>(
  ({ sm, md, lg, xl, ...props }, ref) => {
    // Separate variant props from Motion props
    const variantProps: any = {}
    const motionProps: any = { ...props }

    const keys = [
      'display',
      'direction',
      'cols',
      'align',
      'justify',
      'gap',
      'fullWidth',
      'fullHeight',
      'wrap',
      'p',
      'pt',
      'pb',
      'px',
      'py',
      'flex',
      'maxWidth',
      'mx',
      'minHeight',
      'minWidth',
      'height',
      'width',
      'position',
      'top',
      'bottom',
      'left',
      'right',
      'inset',
      'rounded',
      'border',
      'borderColor',
      'bgColor',
      'overflow',
      'scrollbar',
      'shadow',
      'zIndex',
      'pointerEvents',
      'opacity',
    ]
    keys.forEach((key) => {
      if (key in motionProps) {
        variantProps[key] = motionProps[key]
        delete motionProps[key]
      }
    })

    return (
      <motion.div
        ref={ref}
        className={cn(
          stackVariants(variantProps),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...motionProps}
      />
    )
  }
)

MotionStack.displayName = 'MotionStack'

export const MotionHStack = forwardRef<HTMLDivElement, Omit<MotionStackProps, 'direction'>>(
  (props, ref) => <MotionStack ref={ref} direction="row" {...props} />
)
MotionHStack.displayName = 'MotionHStack'

export const MotionVStack = forwardRef<HTMLDivElement, Omit<MotionStackProps, 'direction'>>(
  (props, ref) => <MotionStack ref={ref} direction="col" {...props} />
)
MotionVStack.displayName = 'MotionVStack'
