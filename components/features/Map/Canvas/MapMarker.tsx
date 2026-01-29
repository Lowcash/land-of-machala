'use client'

import { AlertCircle, HelpCircle, Lock, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Location, LocationType } from '../Shared/types'

interface MapMarkerProps {
  location: Location
  isSelected: boolean
  isDiscovered: boolean
  isUnlocked: boolean
  activeQuest?: { type: 'giver' | 'turnin' }
  onSelect: (location: Location) => void
  percent: { x: number; y: number }
  getIcon: (type: LocationType) => LucideIcon
  getColor: (type: LocationType | string) => string
}

export function MapMarker({
  location,
  isSelected,
  isDiscovered,
  isUnlocked,
  activeQuest,
  onSelect,
  percent,
  getIcon,
  getColor,
}: MapMarkerProps) {
  if (!isDiscovered) return null

  const Icon = getIcon(location.type)
  const color = getColor(location.type)

  return (
    <Button
      onClick={() => isUnlocked && onSelect(location)}
      disabled={!isUnlocked}
      variant="ghost"
      className={`absolute -mt-6 -ml-6 h-12 w-12 p-0 transition-all ${
        isUnlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-40'
      } ${isSelected ? 'z-40 scale-125' : 'z-20'}`}
      style={{
        left: `${percent.x}%`,
        top: `${percent.y}%`,
      }}
      title={location.name}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center rounded-full ${
          isUnlocked
            ? 'border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]'
            : 'border-2 border-[#8b6f47] bg-black/60'
        } ${isSelected ? 'border-[#ffd700] shadow-lg shadow-[#ffd700]/50' : ''}`}
      >
        {isUnlocked && Icon ? (
          <Icon className={`h-6 w-6 ${color}`} />
        ) : (
          <Lock className="h-6 w-6 text-[#8b6f47]" />
        )}

        {activeQuest && (
          <div className="absolute -top-2 -right-2 z-50 animate-bounce">
            {activeQuest.type === 'giver' ? (
              <AlertCircle className="h-5 w-5 fill-black text-[#ffd700]" />
            ) : (
              <HelpCircle className="h-5 w-5 fill-black text-[#ffd700]" />
            )}
          </div>
        )}

        {location.level > 1 && (
          <span
            className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#8b6f47] bg-[#ff6b6b] text-[10px] text-white"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {location.level}
          </span>
        )}
      </div>

      <div
        className={`mt-1 rounded bg-black/40 px-1 text-center text-[10px] whitespace-nowrap backdrop-blur-sm ${isSelected ? 'font-bold text-[#ffd700]' : 'text-[#d4a574]'}`}
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {location.name}
      </div>
    </Button>
  )
}
