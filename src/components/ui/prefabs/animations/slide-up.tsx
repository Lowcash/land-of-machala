'use client'

import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 300, damping: 28 } as const

interface SlideUpProps {
  children: React.ReactNode
  delay?: number
  distance?: number
}

/**
 * SlideUp – slide from slightly below + fade in; great for lists, alerts, etc.
 */
export function SlideUp({ children, delay = 0, distance = 12 }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: distance }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}
