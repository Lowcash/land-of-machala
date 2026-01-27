'use client'

import { ArrowLeft, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { Location } from '../Shared/types'

interface LocationDetailsProps {
  location: Location
  onCloseAction: () => void
}

const TYPE_LABELS = {
  TOWN: 'Město',
  DUNGEON: 'Dungeon',
  WILDERNESS: 'Divočina',
  LANDMARK: 'Zajímavost',
}

const DANGER_LEVELS = {
  TOWN: 'Bezpečné',
  DUNGEON: 'Velmi nebezpečné',
  WILDERNESS: 'Střední',
  LANDMARK: 'Proměnlivé',
}

const REWARD_LEVELS = {
  TOWN: 'Obchod',
  DUNGEON: 'Vysoké',
  WILDERNESS: 'Střední',
  LANDMARK: 'Legendární',
}

export function LocationDetails({ location, onCloseAction }: LocationDetailsProps) {
  const isUnlocked = location.level <= 5 // Simple unlock logic

  const typeColor =
    location.type === 'TOWN'
      ? 'bg-[#ffd700]/20 text-[#ffd700]'
      : location.type === 'DUNGEON'
        ? 'bg-[#ff6b6b]/20 text-[#ff6b6b]'
        : location.type === 'WILDERNESS'
          ? 'bg-[#6fbf6f]/20 text-[#6fbf6f]'
          : 'bg-[#b66bd4]/20 text-[#b66bd4]'

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4">
          {/* Back button (mobile only) */}
          <div className="sticky top-0 z-30 mb-2 shrink-0 border-b border-[#8b6f47] bg-black/95 px-4 py-3 backdrop-blur-sm md:hidden">
            <Button
              variant="ghost"
              onClick={onCloseAction}
              className="inline-flex h-auto items-center gap-2 px-0 text-sm text-[#d4a574] transition-colors hover:bg-transparent hover:text-[#ffd700]"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na mapu
            </Button>
          </div>

          <div className="px-4 pb-4">
            {/* Location header */}
            <div>
              <h2
                className="mb-2 text-lg text-[#ffd700]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {location.name}
              </h2>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded px-2 py-0.5 text-xs ${typeColor}`}
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {TYPE_LABELS[location.type]}
                </span>
                {location.level > 1 && (
                  <span
                    className="rounded bg-[#ff6b6b]/20 px-2 py-0.5 text-xs text-[#ff6b6b]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Lvl {location.level}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <Card variant="game" className="mt-4 bg-black/60 p-3">
              <h3
                className="mb-2 text-sm text-[#d4a574]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                Popis:
              </h3>
              <p className="text-sm leading-relaxed text-[#f5e6d3]">
                {location.description || 'Tajemné místo čekající na prozkoumání.'}
              </p>
            </Card>

            {/* Information */}
            {isUnlocked ? (
              <>
                <Card variant="game" className="mt-4 bg-black/60 p-3">
                  <h3
                    className="mb-2 text-sm text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Informace:
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#8b7355]">Doporučený level:</span>
                      <span className="text-[#ffd700]">{location.level}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b7355]">Nepřátelé:</span>
                      <span className="text-[#ff6b6b]">{DANGER_LEVELS[location.type]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b7355]">Odměny:</span>
                      <span className="text-[#ffd700]">{REWARD_LEVELS[location.type]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b7355]">Pozice:</span>
                      <span className="text-[#69ccf0]">
                        {location.positionX}, {location.positionY}
                      </span>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card variant="game" className="mt-4 bg-black/60 p-4 text-center">
                <Lock className="mx-auto mb-2 h-8 w-8 text-[#ff6b6b]" />
                <p className="mb-1 text-sm text-[#ff6b6b]">Uzamčená lokace</p>
                <p className="text-xs text-[#8b7355]">
                  Dosáhni level {location.level} pro odemknutí
                </p>
              </Card>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
