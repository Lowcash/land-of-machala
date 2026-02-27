'use client'

import { Children } from 'react'

import { type Variants, motion } from 'framer-motion'

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 26 },
  },
}

interface StaggeredListProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
}

/**
 * StaggeredList – wraps children in staggered entrance animation.
 */
export function StaggeredList({ children, stagger = 0.07, delay = 0 }: StaggeredListProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      custom={stagger}
      style={{ transitionDelay: `${delay}s` }}
    >
      {Children.map(children, (child) =>
        child == null ? null : <motion.div variants={staggerItem}>{child}</motion.div>
      )}
    </motion.div>
  )
}
