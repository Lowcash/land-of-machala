import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface ActionBtnProps {
  onClick: () => void
  children: ReactNode
  icon: LucideIcon
  className?: string
}

export function ActionBtn({ onClick, children, icon: Icon, className = '' }: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[44px] w-full items-center gap-2 rounded-lg border-2 border-[#8b6f47]/50 bg-black/60 px-3 py-2.5 text-left text-xs text-[#d4a574] shadow-md transition-all duration-300 hover:border-[#ffd700] hover:bg-black/80 hover:text-[#ffd700] hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-xl sm:text-sm ${className} `}
      style={{ fontFamily: 'var(--font-fantasy)' }}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 leading-tight">{children}</span>
    </button>
  )
}

interface DirectionBtnProps {
  onClick: () => void
  children: ReactNode
  icon: LucideIcon
  image: string
}

export function DirectionBtn({ onClick, children, icon: Icon, image }: DirectionBtnProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex min-h-[44px] w-full items-center gap-2 overflow-hidden rounded-lg border-2 border-[#8b6f47]/50 bg-black/60 px-3 py-2.5 text-left text-xs text-[#d4a574] shadow-md transition-all duration-300 hover:border-[#ffd700] hover:bg-black/80 hover:text-[#ffd700] hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-xl sm:text-sm"
      style={{ fontFamily: 'var(--font-fantasy)' }}
    >
      {/* Background image on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundImage: `url(${image})` }}
      />
      <Icon className="relative z-10 h-4 w-4 shrink-0" />
      <span className="relative z-10 flex-1 leading-tight">{children}</span>
    </button>
  )
}
