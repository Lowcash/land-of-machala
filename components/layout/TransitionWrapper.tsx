'use client'

import type { ReactNode } from 'react'

import { motion } from 'framer-motion'

interface TransitionWrapperProps {
  children: ReactNode
}

export function TransitionWrapper({ children }: TransitionWrapperProps) {
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
