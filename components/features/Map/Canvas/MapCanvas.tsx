'use client'

import { Castle, Home, MapPin, Mountain, Skull, Trees } from 'lucide-react'

import type { Location, LocationType } from '../Shared/types'
import { MapMarker } from './MapMarker'

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
      {locations.map((location) => (
        <MapMarker
          key={location.id}
          location={location}
          percent={toPercent(location.positionX, location.positionY)}
          isSelected={selectedLocation?.id === location.id}
          isDiscovered={discoveredLocations.includes(location.id)}
          isUnlocked={location.level <= 100}
          activeQuest={questMarkers.find((q) => q.locationId === location.id)}
          onSelect={onSelectLocation}
          getIcon={getLocationIcon}
          getColor={getLocationColor}
        />
      ))}
    </div>
  )
}
