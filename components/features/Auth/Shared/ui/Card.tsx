import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`border-game-gold/20 rounded-lg border bg-black/40 p-8 shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  )
}
