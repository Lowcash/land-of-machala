'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

/**
 * A core animation primitive for smooth content entrance.
 * Use this anywhere in the app to wrap content that should fade in.
 */
export function FadeIn({ children, duration = 0.5, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeInOut' }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  )
}
