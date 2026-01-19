'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { useRef } from 'react'

interface LogEntry {
  id: string
  timestamp: Date
  message: string
  type: string
}

interface InfoLogPanelProps {
  logs: LogEntry[]
  title?: string
  className?: string
}

export function InfoLogPanel({ logs, title = 'Deník', className = '' }: InfoLogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`relative flex min-h-0 flex-col rounded-lg border-2 border-[#8b6f47] bg-black/80 p-3 shadow-xl backdrop-blur-md sm:p-4 ${className}`}
    >
      <h3 className="mb-3 shrink-0 text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {title}
      </h3>
      <div className="relative min-h-0 flex-1">
        <ScrollIndicator targetRef={scrollRef} position="both" />
        <div
          ref={scrollRef}
          className="scrollbar-custom h-full space-y-1.5 overflow-y-auto p-1"
        >
          {logs.length === 0 ? (
            <div className="text-center text-xs text-[#8b7355] py-4 italic">
              Zatím žádné záznamy...
            </div>
          ) : (
            logs.map((log) => {
              const colors = {
                playerAttack: 'text-[#ffd700] border-l-[#ffd700]',
                enemyAttack: 'text-[#ff6b6b] border-l-[#ff6b6b]',
                defend: 'text-[#69ccf0] border-l-[#69ccf0]',
                heal: 'text-[#6fbf6f] border-l-[#6fbf6f]',
                mana: 'text-[#c084fc] border-l-[#c084fc]',
                info: 'text-[#8b7355] border-l-[#8b7355]',
                travel: 'text-[#d4a574] border-l-[#d4a574]',
                discovery: 'text-[#b66bd4] border-l-[#b66bd4]',
                quest: 'text-[#ffd700] border-l-[#ffd700]',
                loot: 'text-[#6fbf6f] border-l-[#6fbf6f]',
                death: 'text-[#ff6b6b] border-l-[#ff6b6b]',
              }
              const colorClass =
                colors[log.type as keyof typeof colors] || 'text-[#f5e6d3] border-l-[#8b6f47]'

              return (
                <div
                  key={log.id}
                  className={`rounded-lg border-l-2 px-3 py-1.5 text-xs sm:text-sm ${colorClass} bg-black/40 backdrop-blur-sm transition-opacity hover:bg-black/60`}
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <span className="mr-2 opacity-50 text-[10px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  {log.message}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
