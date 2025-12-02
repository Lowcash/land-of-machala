'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Location } from '@/types'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'

import type { EnterPlaceChangeEvent } from '@/components/app/Place'
import type { SafeActionResultData } from '@/lib/safe-action-client-utils'
import type { showInfo } from '@/app/actions/game'

// Dynamic imports for heavy components - reduces initial bundle size
const Combat = dynamic(() => import('@/components/app/Combat').then((m) => ({ default: m.Combat })), {
  loading: () => <div>Loading combat...</div>,
})
const Loot = dynamic(() => import('@/components/app/Loot').then((m) => ({ default: m.Loot })), {
  loading: () => <div>Loading loot...</div>,
})
const Place = dynamic(() => import('@/components/app/Place').then((m) => ({ default: m.Place })), {
  loading: () => <div>Loading place...</div>,
})
const Explore = dynamic(() => import('@/components/app/Explore').then((m) => ({ default: m.Explore })), {
  loading: () => <div>Loading exploration...</div>,
})

interface WorldClientProps {
  initialData?: SafeActionResultData<typeof showInfo>
}

export function WorldClient({ initialData }: WorldClientProps) {
  // Hydrate React Query with server data for instant initial render
  const gameShowInfoQuery = useGameShowInfoQuery({
    initialData,
    // Refetch in background to ensure fresh data
    staleTime: 0,
  })

  const { selectedLocation, setSelectedLocation } = useSetLocation(
    gameShowInfoQuery.derived.hasDefeated ? 'hospital' : (gameShowInfoQuery.data?.place?.id ?? 'road'),
  )

  const handleEnteredPlaceChange: EnterPlaceChangeEvent = (place) => setSelectedLocation(place)

  return (
    <Suspense fallback={<div>Loading world...</div>}>
      {gameShowInfoQuery.derived.hasCombat && <Combat />}
      {gameShowInfoQuery.derived.hasLoot && <Loot />}
      {gameShowInfoQuery.derived.hasPlace && (
        <Place enteredPlace={selectedLocation} onEnteredPlaceChange={handleEnteredPlaceChange} />
      )}
      {!gameShowInfoQuery.derived.hasCombat &&
        !gameShowInfoQuery.derived.hasLoot &&
        !gameShowInfoQuery.derived.hasPlace && <Explore />}
    </Suspense>
  )
}

function useSetLocation(location?: Location) {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>()

  useSetLocationBackgroundEffect(selectedLocation)

  React.useEffect(() => setSelectedLocation(location), [location])

  return { selectedLocation, setSelectedLocation }
}
