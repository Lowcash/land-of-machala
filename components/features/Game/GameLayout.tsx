'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import type { ReactNode} from 'react';
import { useRef } from 'react'

interface PanelProps {
  title: string
  children: ReactNode
  className?: string
}

export function GamePanel({ title, children, className = '' }: PanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`relative flex min-h-0 flex-col rounded-lg border-2 border-[#8b6f47] bg-black/80 p-3 shadow-xl backdrop-blur-md sm:p-4 ${className}`}
    >
      <h3 className="mb-3 shrink-0 text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {title}
      </h3>
      <div ref={scrollRef} className="scrollbar-custom relative min-h-0 flex-1 overflow-y-auto">
        <ScrollIndicator targetRef={scrollRef} position="bottom" />
        {children}
      </div>
    </div>
  )
}

interface GameLayoutProps {
  children: ReactNode // Typically two GamePanel components
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-2">{children}</div>
    </div>
  )
}
