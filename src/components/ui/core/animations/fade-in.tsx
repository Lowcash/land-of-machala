'use client'

import { motion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  as?: React.ElementType
}

/**
 * A core animation primitive for smooth content entrance.
 * Use this anywhere in the app to wrap content that should fade in.
 */
export function FadeIn({
  children,
  duration = 0.5,
  delay = 0,
  className,
  as: Component = 'div',
}: FadeInProps) {
  return (
    <motion.div
      data-testid="fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  )
}
