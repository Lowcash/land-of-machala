'use client'

import { Children, type ReactNode } from 'react'

import { AnimatePresence, type Variants, motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Shared defaults
// ---------------------------------------------------------------------------

const SPRING = { type: 'spring', stiffness: 300, damping: 28 } as const
const EASE_OUT = { duration: 0.2, ease: 'easeOut' } as const

// ---------------------------------------------------------------------------
// Presence – semantic wrapper for AnimatePresence.
// Use this to wrap conditional components that need exit animations.
// ---------------------------------------------------------------------------

interface PresenceProps {
  children: ReactNode
  /** Defaults to 'wait' for cleaner swaps */
  mode?: 'wait' | 'popLayout' | 'sync'
  initial?: boolean
}

export function Presence({ children, mode = 'wait', initial = false }: PresenceProps) {
  return (
    <AnimatePresence mode={mode} initial={initial}>
      {children}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Expand – height entrance animation; used for alerts, accordion contents, etc.
// ---------------------------------------------------------------------------

interface ExpandProps {
  children: ReactNode
  id?: string
  initialHeight?: string | number
}

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

// ---------------------------------------------------------------------------
// FadeIn – simple opacity entrance for containers, cards, etc.
// ---------------------------------------------------------------------------

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
}

export function FadeIn({ children, delay = 0, duration = 0.25 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// SlideUp – slide from slightly below + fade in; great for lists, alerts, etc.
// ---------------------------------------------------------------------------

interface SlideUpProps {
  children: ReactNode
  delay?: number
  distance?: number
}

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

// ---------------------------------------------------------------------------
// ScaleIn – pop-in scale; for tooltips, modals, selection highlights.
// ---------------------------------------------------------------------------

interface ScaleInProps {
  children: ReactNode
  delay?: number
}

export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ ...EASE_OUT, delay }}
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
  children: ReactNode
  stagger?: number
  delay?: number
}

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

// ---------------------------------------------------------------------------
// PresenceSwap – swaps children with AnimatePresence; replaces the inline
// AnimatePresence + motion.div pattern for conditional content changes.
// ---------------------------------------------------------------------------

interface PresenceSwapProps {
  children: ReactNode
  /** Key must change whenever content changes, triggering the exit/enter cycle */
  swapKey: string | number | null | undefined
  mode?: 'wait' | 'popLayout' | 'sync'
}

export function PresenceSwap({ children, swapKey, mode = 'wait' }: PresenceSwapProps) {
  return (
    <Presence mode={mode}>
      <motion.div
        key={swapKey ?? '__empty__'}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={EASE_OUT}
      >
        {children}
      </motion.div>
    </Presence>
  )
}
