'use client'

import { Castle, Home, Lock, MapPin, Mountain, Trees } from 'lucide-react'
import type { Location, LocationType } from './types'

interface MapCanvasProps {
  locations: Location[]
  playerPosition: { x: number; y: number }
  selectedLocation: Location | null
  onSelectLocation: (location: Location) => void
}

const MIN_X = 50
const MAX_X = 300
const MIN_Y = 30
const MAX_Y = 200

function getLocationIcon(type: LocationType) {
  switch (type) {
    case 'TOWN':
      return Home
    case 'DUNGEON':
      return Castle
    case 'WILDERNESS':
      return Trees
    case 'LANDMARK':
      return Mountain
  }
}

function getLocationColor(type: LocationType) {
  switch (type) {
    case 'TOWN':
      return 'text-[#ffd700]'
    case 'DUNGEON':
      return 'text-[#ff6b6b]'
    case 'WILDERNESS':
      return 'text-[#6fbf6f]'
    case 'LANDMARK':
      return 'text-[#b66bd4]'
  }
}

export function MapCanvas({
  locations,
  playerPosition,
  selectedLocation,
  onSelectLocation,
}: MapCanvasProps) {
  // Convert absolute coordinates to percentage
  const toPercent = (x: number, y: number) => ({
    x: ((x - MIN_X) / (MAX_X - MIN_X)) * 100,
    y: ((y - MIN_Y) / (MAX_Y - MIN_Y)) * 100,
  })

  const playerPercent = toPercent(playerPosition.x, playerPosition.y)

  return (
    <div className="relative h-full w-full p-8">
      {/* Decorative grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(#8b6f47 1px, transparent 1px), linear-gradient(90deg, #8b6f47 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.1,
        }}
      ></div>

      {/* Roads connecting to player position */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        {locations.map((loc) => {
          const locPercent = toPercent(loc.positionX, loc.positionY)
          return (
            <line
              key={loc.id}
              x1={`${playerPercent.x}%`}
              y1={`${playerPercent.y}%`}
              x2={`${locPercent.x}%`}
              y2={`${locPercent.y}%`}
              stroke="#8b6f47"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          )
        })}
      </svg>

      {/* Player position marker */}
      <div
        className="absolute -mt-4 -ml-4 h-8 w-8 animate-pulse"
        style={{
          left: `${playerPercent.x}%`,
          top: `${playerPercent.y}%`,
          zIndex: 10,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-[#69ccf0] shadow-lg">
          <MapPin className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Locations */}
      {locations.map((location) => {
        const Icon = getLocationIcon(location.type)
        const color = getLocationColor(location.type)
        const percent = toPercent(location.positionX, location.positionY)
        const isSelected = selectedLocation?.id === location.id
        const isUnlocked = location.level <= 5 // Simple unlock logic (levels 1-5 unlocked)

        return (
          <button
            key={location.id}
            onClick={() => isUnlocked && onSelectLocation(location)}
            disabled={!isUnlocked}
            className={`absolute -mt-6 -ml-6 h-12 w-12 transition-all ${
              isUnlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-40'
            } ${isSelected ? 'scale-125' : ''}`}
            style={{
              left: `${percent.x}%`,
              top: `${percent.y}%`,
              zIndex: isSelected ? 20 : 5,
            }}
            title={location.name}
          >
            <div
              className={`relative flex h-full w-full items-center justify-center rounded-full ${
                isUnlocked
                  ? 'border-2 border-[#d4a574] bg-gradient-to-br from-[#8b6f47] to-[#6d5a3e]'
                  : 'border-2 border-[#8b6f47] bg-black/60'
              } ${isSelected ? 'border-[#ffd700] shadow-lg shadow-[#ffd700]/50' : ''}`}
            >
              {isUnlocked ? (
                <Icon className={`h-6 w-6 ${color}`} />
              ) : (
                <Lock className="h-6 w-6 text-[#8b6f47]" />
              )}
              {location.level > 1 && (
                <span
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#8b6f47] bg-[#ff6b6b] text-[10px] text-white"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {location.level}
                </span>
              )}
            </div>
            <div
              className="mt-1 text-center text-[10px] whitespace-nowrap text-[#d4a574]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {location.name}
            </div>
          </button>
        )
      })}
    </div>
  )
}
