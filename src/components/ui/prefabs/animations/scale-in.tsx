'use client'

import { motion } from 'framer-motion'

const EASE_OUT = { duration: 0.2, ease: 'easeOut' } as const

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
}

/**
 * ScaleIn – pop-in scale; for tooltips, modals, selection highlights.
 */
export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ ...EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
