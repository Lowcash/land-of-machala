'use client'

import { AnimatePresence } from 'framer-motion'

interface PresenceProps {
  children: React.ReactNode
  /** Defaults to 'wait' for cleaner swaps */
  mode?: 'wait' | 'popLayout' | 'sync'
  initial?: boolean
}

/**
 * Presence – semantic wrapper for AnimatePresence.
 * Use this to wrap conditional components that need exit animations.
 */
export function Presence({ children, mode = 'wait', initial = false }: PresenceProps) {
  return (
    <AnimatePresence mode={mode} initial={initial}>
      {children}
    </AnimatePresence>
  )
}
