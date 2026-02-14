'use client'

import * as React from 'react'

import { motion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
}

export function FadeIn({ children, duration = 0.5 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: 'easeInOut' }}
      className="flex w-full flex-col items-center"
    >
      {children}
    </motion.div>
  )
}
