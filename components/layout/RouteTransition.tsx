'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RouteTransitionProps {
  children: ReactNode
}

export function RouteTransition({ children }: RouteTransitionProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
