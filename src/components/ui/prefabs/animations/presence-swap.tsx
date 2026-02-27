'use client'

import { motion } from 'framer-motion'

import { Presence } from './presence'

const EASE_OUT = { duration: 0.2, ease: 'easeOut' } as const

interface PresenceSwapProps {
  children: React.ReactNode
  /** Key must change whenever content changes, triggering the exit/enter cycle */
  swapKey: string | number | null | undefined
  mode?: 'wait' | 'popLayout' | 'sync'
}

/**
 * PresenceSwap – swaps children with AnimatePresence; replaces the inline
 * AnimatePresence + motion.div pattern for conditional content changes.
 */
export function PresenceSwap({ children, swapKey, mode = 'wait' }: PresenceSwapProps) {
  return (
    <Presence mode={mode}>
      <motion.div
        key={swapKey ?? '__empty__'}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={EASE_OUT}
      >
        {children}
      </motion.div>
    </Presence>
  )
}
