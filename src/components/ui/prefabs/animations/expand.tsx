'use client'

import { motion } from 'framer-motion'

interface ExpandProps {
  children: React.ReactNode
  id?: string
  initialHeight?: string | number
}

/**
 * Expand – height entrance animation; used for alerts, accordion contents, etc.
 */
export function Expand({ children, id, initialHeight = 0 }: ExpandProps) {
  return (
    <motion.div
      key={id}
      initial={{ height: initialHeight, opacity: 0, y: 10 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: initialHeight, opacity: 0, y: 10 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 250,
        opacity: { duration: 0.2 },
      }}
      style={{ originY: 0 }}
    >
      {children}
    </motion.div>
  )
}
