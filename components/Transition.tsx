'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  pageKey: string
}

export default function Transition({ children, ...p }: React.PropsWithChildren<Props>) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={p.pageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
