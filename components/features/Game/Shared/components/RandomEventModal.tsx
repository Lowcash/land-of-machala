'use client'

import { Sparkles } from 'lucide-react'

import type { RandomEvent } from '@/types/events'

import { getEventTypeColor, getEventTypeIconColor } from '@/lib/game/views'

import { Button } from '@/components/ui/button'

interface RandomEventModalProps {
  event: RandomEvent | null
  onChoice: (choiceId: number) => void
  onClose: () => void
}

export function RandomEventModal({ event, onChoice, onClose }: RandomEventModalProps) {
  // 1. Hooks - None currently

  // 2. Navigation State / Derived Values
  if (!event) return null

  const typeColor = getEventTypeColor(event.type)
  const typeIconColor = getEventTypeIconColor(event.type)
  const EventIcon = Sparkles

  // 3. Handlers
  const handleConfirm = () => {
    onChoice(1)
    onClose()
  }

  // 4. Sub-components (Render helpers)
  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center p-4 duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border-2 border-[#8b6f47]/40 bg-linear-to-b from-slate-900/98 to-slate-800/98 shadow-2xl backdrop-blur-md">
        <div className={`border-b-2 ${typeColor} px-6 py-4`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
              <EventIcon className={`h-6 w-6 ${typeIconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-[#f5e6d3]">{event.title}</h2>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${typeColor}`}
                >
                  {event.type}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400 italic">Náhodné setkání...</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 text-center">
          <div className="mb-6 rounded-lg border border-[#8b6f47]/20 bg-black/40 p-6 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-[#f5e6d3]">{event.description}</p>
          </div>

          <Button onClick={handleConfirm} variant="game-primary" className="min-w-[200px] px-8">
            <span>Pokračovat v cestě</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
