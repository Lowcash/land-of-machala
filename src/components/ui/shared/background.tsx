'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

/**
 * Maps application paths to background location names.
 */
const PATH_TO_LOCATION: Record<string, string> = {
  '/login': 'city',
  '/': 'city', // Default for landing page
}

const BACKGROUNDS: Record<string, string> = {
  city: '/assets/locations/city.jpg',
}

export function Background() {
  const pathname = usePathname()
  const location = PATH_TO_LOCATION[pathname] || 'city'
  const src = BACKGROUNDS[location]

  if (!src) return null

  return (
    <div 
      className="fixed inset-0 -z-50 overflow-hidden bg-(--color-background)"
      aria-hidden="true"
    >
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
            quality={85}
          />
          {/* Vignette overlay for better text readability */}
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
