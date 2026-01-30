'use client'

import { MAP_LEGEND_ITEMS, MAP_LEGEND_TIP } from '@/lib/constants/map'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import type { MapFilters } from '../Shared/types'

interface MapLegendProps {
  filters: MapFilters
  onFiltersChange: (filters: MapFilters) => void
}

export function MapLegend({ filters, onFiltersChange }: MapLegendProps) {
  // 1. Hooks - None currently

  // 2. Navigation State / Derived Values - None currently

  // 3. Handlers
  const toggleFilter = (filterKey: keyof MapFilters) => {
    onFiltersChange({
      ...filters,
      [filterKey]: !filters[filterKey],
    })
  }

  // 4. Sub-components (Render helpers)
  const LegendItemRender = ({ item }: { item: (typeof MAP_LEGEND_ITEMS)[number] }) => {
    const Icon = item.icon
    const isFilterable = 'filterKey' in item && item.filterKey !== undefined
    const isActive = !isFilterable || (item.filterKey && filters[item.filterKey])

    // Special case for static items (Player, Locked)
    if (item.id === 'player' || item.id === 'locked') {
      const isPlayer = item.id === 'player'
      return (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
              isPlayer ? 'border-white bg-[#69ccf0]' : 'border-[#8b6f47] bg-black/60'
            )}
          >
            <Icon className={cn('h-4 w-4', isPlayer ? 'text-white' : 'text-[#8b6f47]')} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#d4a574]">{item.label}</div>
            <div className="text-xs text-[#8b7355]">{item.description}</div>
          </div>
        </div>
      )
    }

    // Filterable items
    return (
      <Button
        variant="game-secondary"
        onClick={() => isFilterable && item.filterKey && toggleFilter(item.filterKey)}
        className={cn(
          'flex h-auto w-full items-center justify-start gap-3 p-2',
          !isActive && 'opacity-50'
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#d4a574] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e]">
          <Icon className="h-4 w-4" style={{ color: item.color }} />
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm text-[#d4a574]">{item.label}</div>
          <div className="text-xs text-[#8b7355]">{item.description}</div>
        </div>
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        Legenda mapy
      </h2>

      <div className="space-y-3">
        {MAP_LEGEND_ITEMS.map((item) => (
          <LegendItemRender key={item.id} item={item} />
        ))}
      </div>

      {/* Tip */}
      <div className="rounded border border-[#d4a574] bg-black/60 p-3">
        <p className="text-xs leading-relaxed text-[#f5e6d3]">
          <span className="text-[#ffd700]">Tip:</span> {MAP_LEGEND_TIP}
        </p>
      </div>
    </div>
  )
}
