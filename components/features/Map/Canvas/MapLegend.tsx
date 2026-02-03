'use client'

import { MAP_LEGEND_ITEMS, MAP_LEGEND_TIP } from '@/lib/constants/map'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameMarker, ProfileHeader } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, H3, Span } from '@/components/ui/typography'

import type { MapFilters } from '../Shared/types'

interface MapLegendProps {
  filters: MapFilters
  onFiltersChange: (filters: MapFilters) => void
}

export function MapLegend({ filters, onFiltersChange }: MapLegendProps) {
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
        <ProfileHeader
          avatar={
            <GameMarker
              icon={Icon}
              color={isPlayer ? 'player' : 'muted'}
              size="sm"
              glow={isPlayer}
            />
          }
          title={item.label}
          subtitle={item.description}
        />
      )
    }

    // Filterable items
    return (
      <VStack fullWidth opacity={!isActive ? '50' : '100'}>
        <Button
          variant="secondary_game"
          onClick={() => isFilterable && item.filterKey && toggleFilter(item.filterKey)}
          fullWidth
          icon={Icon}
          label={item.label}
          subLabel={item.description}
        />
      </VStack>
    )
  }

  return (
    <VStack gap="lg" fullWidth>
      <H3 font="fantasy" color="gold">
        Legenda mapy
      </H3>

      <VStack gap="md" fullWidth>
        {MAP_LEGEND_ITEMS.map((item) => (
          <LegendItemRender key={item.id} item={item} />
        ))}
      </VStack>

      {/* Tip */}
      <Card variant="muted" fullWidth>
        <Card.Content>
          <HStack leading="relaxed" fullWidth>
            <Caption color="copper">
              <Span color="gold" bold>
                Tip:{' '}
              </Span>
              {MAP_LEGEND_TIP}
            </Caption>
          </HStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
