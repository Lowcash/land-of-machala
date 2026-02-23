'use client'

import { type ReactNode } from 'react'

import { MotionStack } from '../../core/animations/motion-stack'

interface AnimateNotifyProps {
  children: ReactNode
  id?: string
}

/**
 * A reusable animation wrapper for notification items.
 * Handles entry/exit animations and layout shifts.
 */
export function AnimateNotify({ children, id }: AnimateNotifyProps) {
  return (
    <MotionStack
      key={id}
      layout
      initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: 40, filter: 'blur(5px)' }}
      transition={{
        layout: { type: 'spring', damping: 30, stiffness: 300 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
        x: { type: 'spring', damping: 25, stiffness: 200 },
      }}
      fullWidth
      pointerEvents="auto"
    >
      {children}
    </MotionStack>
  )
}
