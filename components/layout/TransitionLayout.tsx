'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface TransitionLayoutProps {
  children: ReactNode
}

export function TransitionLayout({ children }: TransitionLayoutProps) {
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
