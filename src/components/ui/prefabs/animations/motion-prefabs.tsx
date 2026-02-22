'use client'

import * as React from 'react'

import { type Variants, AnimatePresence, motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Shared defaults
// ---------------------------------------------------------------------------

const SPRING = { type: 'spring', stiffness: 300, damping: 28 } as const
const EASE_OUT = { duration: 0.2, ease: 'easeOut' } as const

// ---------------------------------------------------------------------------
// FadeIn – simple opacity entrance for containers, cards, etc.
// ---------------------------------------------------------------------------

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.25, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// SlideUp – slide from slightly below + fade in; great for lists, alerts, etc.
// ---------------------------------------------------------------------------

interface SlideUpProps {
  children: React.ReactNode
  delay?: number
  distance?: number
  className?: string
}

export function SlideUp({ children, delay = 0, distance = 12, className }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: distance }}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// ScaleIn – pop-in scale; for tooltips, modals, selection highlights.
// ---------------------------------------------------------------------------

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ ...EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// StaggeredList – wraps children in staggered entrance animation.
// Replace repetitive motion.div + AnimatePresence + stagger patterns.
// ---------------------------------------------------------------------------

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
  /** Optional className applied to the outer wrapper */
  className?: string
}

export function StaggeredList({ children, stagger = 0.07, delay = 0, className }: StaggeredListProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      custom={stagger}
      style={{ transitionDelay: `${delay}s` }}
    >
      {React.Children.map(children, (child) =>
        child == null ? null : (
          <motion.div variants={staggerItem}>{child}</motion.div>
        )
      )}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// PresenceSwap – swaps children with AnimatePresence; replaces the inline
// AnimatePresence + motion.div pattern for conditional content changes.
// ---------------------------------------------------------------------------

interface PresenceSwapProps {
  children: React.ReactNode
  /** Key must change whenever content changes, triggering the exit/enter cycle */
  swapKey: string | number | null | undefined
  mode?: 'wait' | 'popLayout' | 'sync'
  className?: string
}

export function PresenceSwap({ children, swapKey, mode = 'wait', className }: PresenceSwapProps) {
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={swapKey ?? '__empty__'}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={EASE_OUT}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
