import type { ReactNode } from 'react'

import { TransitionWrapper } from '@/components/layout/TransitionWrapper'

interface LayoutProps {
  children: ReactNode
  backgroundImage?: string
  className?: string
  centered?: boolean
}

export function Layout({
  children,
  backgroundImage = '/images/login-bg.webp',
  className = '',
  centered = true,
}: LayoutProps) {
  return (
    <TransitionWrapper>
      <div
        className={`bg-game-wood-dark bg-noise text-game-gold selection:bg-game-gold selection:text-game-wood-dark relative min-h-screen w-full overflow-x-hidden font-serif ${className}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Legacy style: No heavy blur, just gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90" />
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 ${centered ? 'flex min-h-screen flex-col items-center justify-center py-12' : 'flex h-screen flex-col'}`}
        >
          <main className="relative flex min-h-screen items-center justify-center p-4">
            {children}
          </main>
        </div>
      </div>
    </TransitionWrapper>
  )
}
