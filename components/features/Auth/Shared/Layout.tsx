import { RouteTransition } from '@/components/layout/RouteTransition'
import type { ReactNode } from 'react'

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
    <RouteTransition>
      <div
        className={`bg-game-wood-dark text-game-gold selection:bg-game-gold selection:text-game-wood-dark relative min-h-screen w-full overflow-x-hidden font-serif ${className}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* We use a div with background-image to easily handle cover/position if Next Image is tricky with dynamic paths, 
               but ideally we stick to Next Image if possible. 
               However, to match RegisterForm style which uses inline style background-image: */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="bg-game-wood-dark/80 absolute inset-0 backdrop-blur-sm" />
          {/* Add linear gradient overlay from RegisterForm if desired for more depth */}
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90 mix-blend-multiply" />
        </div>

        <div
          className={`relative z-10 container mx-auto min-h-screen px-4 ${centered ? 'flex flex-col items-center justify-center py-12' : 'flex h-screen flex-col'}`}
        >
          {children}
        </div>
      </div>
    </RouteTransition>
  )
}
