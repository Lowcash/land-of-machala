'use client'

import {
  AlertCircle,
  Castle,
  HelpCircle,
  Home,
  Lock,
  MapPin,
  Mountain,
  Skull,
  Trees,
} from 'lucide-react'
import type { Location, LocationType } from '../Shared/types'

interface QuestMarker {
  locationId: string
  type: 'giver' | 'turnin'
  questId: string
}

interface MapCanvasProps {
  locations: Location[]
  playerPosition: { x: number; y: number }
  selectedLocation: Location | null
  onSelectLocation: (location: Location) => void
  discoveredLocations?: string[]
  questMarkers?: QuestMarker[]
  deathLocation?: { x: number; y: number; expiresAt: string } | null
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
    default:
      return MapPin
  }
}

function getLocationColor(type: LocationType | string) {
  switch (type) {
    case 'TOWN':
      return 'text-[#ffd700]'
    case 'DUNGEON':
      return 'text-[#ff6b6b]'
    case 'WILDERNESS':
      return 'text-[#6fbf6f]'
    case 'LANDMARK':
      return 'text-[#b66bd4]'
    default:
      return 'text-[#d4a574]'
  }
}

export function MapCanvas({
  locations,
  playerPosition,
  selectedLocation,
  onSelectLocation,
  discoveredLocations = [],
  questMarkers = [],
  deathLocation,
}: MapCanvasProps) {
  // Convert absolute coordinates to percentage
  const toPercent = (x: number, y: number) => ({
    x: Math.max(0, Math.min(100, ((x - MIN_X) / (MAX_X - MIN_X)) * 100)),
    y: Math.max(0, Math.min(100, ((y - MIN_Y) / (MAX_Y - MIN_Y)) * 100)),
  })

  const playerPercent = toPercent(playerPosition.x, playerPosition.y)

  return (
    <div className="relative h-full w-full p-8 select-none">
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

      {/* Coordinates Display */}
      <div className="absolute top-2 right-2 z-50 rounded border border-[#d4a574] bg-black/80 px-2 py-1 font-mono text-xs text-[#ffd700]">
        X: {playerPosition.x} Y: {playerPosition.y}
      </div>

      {/* Roads connecting to player position */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        {locations.map((loc) => {
          const isDiscovered = discoveredLocations.includes(loc.id)
          if (!isDiscovered) return null

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
          zIndex: 50,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-[#69ccf0] shadow-lg">
          <MapPin className="h-4 w-4 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-[#69ccf0]">
          Jsi zde
        </div>
      </div>

      {/* Loot Pile Marker */}
      {deathLocation && (
        <div
          className="absolute -mt-4 -ml-4 h-8 w-8 animate-bounce cursor-pointer"
          style={{
            left: `${toPercent(deathLocation.x, deathLocation.y).x}%`,
            top: `${toPercent(deathLocation.x, deathLocation.y).y}%`,
            zIndex: 45,
          }}
          title={`Smrt - Expirace: ${new Date(deathLocation.expiresAt).toLocaleDateString()}`}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[#ff6b6b] bg-black/80 shadow-lg shadow-[#ff6b6b]/50">
            <Skull className="h-5 w-5 text-[#ff6b6b]" />
          </div>
        </div>
      )}

      {/* Locations */}
      {locations.map((location) => {
        const Icon = getLocationIcon(location.type)
        const color = getLocationColor(location.type)
        const percent = toPercent(location.positionX, location.positionY)
        const isSelected = selectedLocation?.id === location.id
        const isDiscovered = discoveredLocations.includes(location.id)
        const isUnlocked = location.level <= 100 // Access logic handled by server actions mainly

        const activeQuest = questMarkers.find((q) => q.locationId === location.id)

        if (!isDiscovered) {
          // Fog of war placeholder (optional, or just don't render)
          // For now, only render discovered
          return null
        }

        return (
          <button
            key={location.id}
            onClick={() => isUnlocked && onSelectLocation(location)}
            disabled={!isUnlocked}
            className={`absolute -mt-6 -ml-6 h-12 w-12 transition-all ${
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

              {/* Quest Marker Overlay */}
              {activeQuest && (
                <div className="absolute -top-2 -right-2 z-50 animate-bounce">
                  {activeQuest.type === 'giver' ? (
                    <AlertCircle className="h-5 w-5 fill-black text-[#ffd700]" />
                  ) : (
                    <HelpCircle className="h-5 w-5 fill-black text-[#ffd700]" />
                  )}
                </div>
              )}

              {/* Level Badge */}
              {location.level > 1 && (
                <span
                  className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#8b6f47] bg-[#ff6b6b] text-[10px] text-white"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {location.level}
                </span>
              )}
            </div>

            {/* Name Label */}
            <div
              className={`mt-1 rounded bg-black/40 px-1 text-center text-[10px] whitespace-nowrap backdrop-blur-sm ${isSelected ? 'font-bold text-[#ffd700]' : 'text-[#d4a574]'}`}
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
