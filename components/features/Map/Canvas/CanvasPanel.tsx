'use client'

import type { ReactNode } from 'react'

interface CanvasPanelProps {
  children: ReactNode
  className?: string
}

export function CanvasPanel({ children, className = '' }: CanvasPanelProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md ${className}`}
    >
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
