'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface Subsection {
  title: string
  content: ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
}

interface PanelProps {
  title?: string
  children?: ReactNode
  className?: string
  subsections?: Subsection[]
}

export function GamePanel({ title, children, className = '', subsections }: PanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`relative flex min-h-0 flex-col rounded-lg border-2 border-[#8b6f47] bg-black/80 p-3 shadow-xl backdrop-blur-md sm:p-4 ${className}`}
    >
      {title && (
        <h3 className="mb-3 shrink-0 text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          {title}
        </h3>
      )}

      <div className="relative min-h-0 flex-1">
        <ScrollIndicator targetRef={scrollRef} position="both" />
        <div ref={scrollRef} className="scrollbar-custom h-full overflow-y-auto">
          {children}
          
          {subsections && (
            <div className="flex flex-col gap-4">
              {subsections.map((section, idx) => (
                <PanelSection key={idx} section={section} isLast={idx === subsections.length - 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PanelSection({ section, isLast }: { section: Subsection; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true)
  const isCollapsible = section.collapsible ?? false

  return (
    <div className={`flex flex-col ${!isLast ? 'border-b border-[#8b6f47]/30 pb-4' : ''}`}>
      <button
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between py-1 ${
          isCollapsible ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
        }`}
      >
        <span className="text-[10px] tracking-wider text-[#8b7355] uppercase font-bold">
          {section.title}
        </span>
        {isCollapsible && (
          <ChevronDown
            className={`h-3 w-3 text-[#8b7355] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>
      
      {isOpen && <div className="mt-2">{section.content}</div>}
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
