'use client'

import { usePathname } from 'next/navigation'

export function GameBackgroundWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const transparentRoutes: string[] = []
  const isTransparent = transparentRoutes.some((route) => pathname?.includes(route))

  return (
    <div className={`flex min-h-screen flex-col ${isTransparent ? '' : 'bg-game-bg'}`}>
      {children}
    </div>
  )
}
