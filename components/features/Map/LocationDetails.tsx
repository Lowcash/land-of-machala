'use client'

import { ArrowLeft, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Location } from './types'

interface LocationDetailsProps {
  location: Location
  onClose: () => void
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

export function LocationDetails({ location, onClose }: LocationDetailsProps) {
  const router = useRouter()
  const isUnlocked = location.level <= 5 // Simple unlock logic

  const typeColor =
    location.type === 'TOWN'
      ? 'bg-[#ffd700]/20 text-[#ffd700]'
      : location.type === 'DUNGEON'
        ? 'bg-[#ff6b6b]/20 text-[#ff6b6b]'
        : location.type === 'WILDERNESS'
          ? 'bg-[#6fbf6f]/20 text-[#6fbf6f]'
          : 'bg-[#b66bd4]/20 text-[#b66bd4]'

  const handleTravel = () => {
    if (location.type === 'TOWN') {
      router.push('/game')
    } else {
      router.push('/combat')
    }
  }

  return (
    <div className="space-y-4">
      {/* Back button (mobile only) */}
      <button
        onClick={onClose}
        className="mb-2 flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700] md:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na mapu
      </button>

      {/* Location header */}
      <div>
        <h2 className="mb-2 text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
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
      <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
        <h3 className="mb-2 text-sm text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Popis:
        </h3>
        <p className="text-sm leading-relaxed text-[#f5e6d3]">
          {location.description || 'Tajemné místo čekající na prozkoumání.'}
        </p>
      </div>

      {/* Information */}
      {isUnlocked ? (
        <>
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
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
          </div>

          <button
            onClick={handleTravel}
            className="w-full rounded border border-[#ffd700] bg-gradient-to-r from-[#8b6f47] via-[#a8865d] to-[#8b6f47] py-3 text-white shadow-lg transition-all hover:from-[#a8865d] hover:to-[#a8865d]"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            Cestovat sem
          </button>
        </>
      ) : (
        <div className="rounded border border-[#ff6b6b] bg-black/60 p-4 text-center">
          <Lock className="mx-auto mb-2 h-8 w-8 text-[#ff6b6b]" />
          <p className="mb-1 text-sm text-[#ff6b6b]">Uzamčená lokace</p>
          <p className="text-xs text-[#8b7355]">Dosáhni level {location.level} pro odemknutí</p>
        </div>
      )}
    </div>
  )
}
