'use client'

import { usePathname } from 'next/navigation'

const PATH_TO_LOCATION: Record<string, string> = {
  '/login': 'city',
  '/': 'city',
}

const BACKGROUNDS: Record<string, string> = {
  city: '/assets/locations/city.jpg',
}

export function useBackground() {
  const pathname = usePathname()
  const location = PATH_TO_LOCATION[pathname] || 'city'
  const src = BACKGROUNDS[location]

  return { src, location }
}
