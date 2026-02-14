'use client'

import Image from 'next/image'

import { useBackground } from '@/hooks/game/use-background'
import { AnimatePresence, motion } from 'framer-motion'

export function Background() {
  const { src } = useBackground()

  if (!src) return null

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-(--color-background)" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative h-full w-full"
        >
          <Image
            src={src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          {/* Linear gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
