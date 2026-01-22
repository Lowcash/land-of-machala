'use client'

import { Castle, Home, Lock, MapPin, Mountain, Trees } from 'lucide-react'
import type { MapFilters } from '../Shared/types'

interface MapLegendProps {
  filters: MapFilters
  onFiltersChange: (filters: MapFilters) => void
}

export function MapLegend({ filters, onFiltersChange }: MapLegendProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        Legenda mapy
      </h2>

      <div className="space-y-3">
        {/* Player position */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#69ccf0]">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#d4a574]">Tvá pozice</div>
            <div className="text-xs text-[#8b7355]">Aktuální lokace</div>
          </div>
        </div>

        {/* Town */}
        <button
          onClick={() => onFiltersChange({ ...filters, showTowns: !filters.showTowns })}
          className={`flex w-full items-center gap-3 rounded border ${
            filters.showTowns ? 'border-[#d4a574]' : 'border-[#8b6f47] opacity-50'
          } bg-black/40 p-2 transition-all hover:bg-black/60`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]">
            <Home className="h-4 w-4 text-[#ffd700]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm text-[#d4a574]">Město</div>
            <div className="text-xs text-[#8b7355]">Bezpečné oblasti</div>
          </div>
        </button>

        {/* Wilderness */}
        <button
          onClick={() => onFiltersChange({ ...filters, showWilderness: !filters.showWilderness })}
          className={`flex w-full items-center gap-3 rounded border ${
            filters.showWilderness ? 'border-[#d4a574]' : 'border-[#8b6f47] opacity-50'
          } bg-black/40 p-2 transition-all hover:bg-black/60`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]">
            <Trees className="h-4 w-4 text-[#6fbf6f]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm text-[#d4a574]">Divočina</div>
            <div className="text-xs text-[#8b7355]">Střední nebezpečí</div>
          </div>
        </button>

        {/* Dungeon */}
        <button
          onClick={() => onFiltersChange({ ...filters, showDungeons: !filters.showDungeons })}
          className={`flex w-full items-center gap-3 rounded border ${
            filters.showDungeons ? 'border-[#d4a574]' : 'border-[#8b6f47] opacity-50'
          } bg-black/40 p-2 transition-all hover:bg-black/60`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]">
            <Castle className="h-4 w-4 text-[#ff6b6b]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm text-[#d4a574]">Dungeon</div>
            <div className="text-xs text-[#8b7355]">Vysoké nebezpečí</div>
          </div>
        </button>

        {/* Landmark */}
        <button
          onClick={() => onFiltersChange({ ...filters, showLandmarks: !filters.showLandmarks })}
          className={`flex w-full items-center gap-3 rounded border ${
            filters.showLandmarks ? 'border-[#d4a574]' : 'border-[#8b6f47] opacity-50'
          } bg-black/40 p-2 transition-all hover:bg-black/60`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]">
            <Mountain className="h-4 w-4 text-[#b66bd4]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm text-[#d4a574]">Zajímavost</div>
            <div className="text-xs text-[#8b7355]">Speciální místa</div>
          </div>
        </button>

        {/* Locked */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#8b6f47] bg-black/60">
            <Lock className="h-4 w-4 text-[#8b6f47]" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#d4a574]">Uzamčeno</div>
            <div className="text-xs text-[#8b7355]">Vyžaduje level</div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="rounded border border-[#d4a574] bg-black/60 p-3">
        <p className="text-xs leading-relaxed text-[#f5e6d3]">
          <span className="text-[#ffd700]">Tip:</span> Klikni na lokaci pro zobrazení detailů a
          cestování. Číslo u lokace označuje doporučený level.
        </p>
      </div>
    </div>
  )
}
