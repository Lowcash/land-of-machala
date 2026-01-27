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
        className={`bg-game-wood-dark text-game-gold selection:bg-game-gold selection:text-game-wood-dark relative min-h-screen w-full overflow-x-hidden font-serif ${className}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="bg-game-wood-dark/80 absolute inset-0 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90 mix-blend-multiply" />
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 ${centered ? 'flex min-h-screen flex-col items-center justify-center py-12' : 'flex h-screen flex-col'}`}
        >
          <div className="flex w-full flex-1 flex-col items-center justify-center">{children}</div>

          {/* Version Footer */}
          <div className="mt-8 shrink-0 text-center opacity-40 transition-opacity hover:opacity-100">
            <p className="font-fantasy text-[10px] tracking-widest text-[#d4a574] uppercase sm:text-xs">
              Verze 2.0 • © {new Date().getFullYear()} Land of Machala
            </p>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  )
}
