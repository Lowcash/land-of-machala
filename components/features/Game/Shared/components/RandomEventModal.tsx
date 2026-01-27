'use client'

import { Sparkles } from 'lucide-react'

import type { RandomEvent } from '@/types/events'

import { Button } from '@/components/ui/button'

interface RandomEventModalProps {
  event: RandomEvent | null
  onChoice: (choiceId: number) => void
  onClose: () => void
}

export function RandomEventModal({ event, onChoice, onClose }: RandomEventModalProps) {
  if (!event) return null

  const handleClose = () => {
    onChoice(1)
    onClose()
  }

  const getTypeColor = () => {
    switch (event.type) {
      case 'combat':
        return 'border-red-500/30 bg-red-900/20'
      case 'treasure':
        return 'border-yellow-500/30 bg-yellow-900/20'
      case 'flavor':
        return 'border-purple-500/30 bg-purple-900/20'
      default:
        return 'border-slate-500/30 bg-slate-900/20'
    }
  }

  const getTypeIconColor = () => {
    switch (event.type) {
      case 'combat':
        return 'text-red-400'
      case 'treasure':
        return 'text-yellow-400'
      case 'flavor':
        return 'text-purple-400'
      default:
        return 'text-slate-400'
    }
  }

  const EventIcon = Sparkles

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center p-4 duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border-2 border-yellow-600/40 bg-linear-to-b from-slate-900/98 to-slate-800/98 shadow-2xl backdrop-blur-md">
        <div className={`border-b-2 ${getTypeColor()} px-6 py-4`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
              <EventIcon className={`h-6 w-6 ${getTypeIconColor()}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-yellow-100">{event.title}</h2>
                <span
                  className={`rounded px-2 py-0.5 text-xs tracking-wide uppercase ${getTypeColor()}`}
                >
                  {event.type}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-400">Náhodné setkání...</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="mb-6 rounded-lg border border-slate-700/30 bg-slate-800/40 p-4 backdrop-blur-sm">
            <p className="leading-relaxed text-slate-200">{event.description}</p>
          </div>

          <Button onClick={handleClose} variant="game-secondary" className="w-full p-4">
            <span className="text-yellow-100">Pokračovat</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
