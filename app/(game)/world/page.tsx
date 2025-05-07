'use client'

import React from 'react'
import type { Location } from '@/types'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'

import Combat from '@/components/app/Combat'
import Loot from '@/components/app/Loot'
import Place, { type EnterPlaceChangeEvent } from '@/components/app/Place'
import Explore from '@/components/app/Explore'

export default function World() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const { selectedLocation, setSelectedLocation } = useSetLocation(
    gameShowInfoQuery.derived.hasDefeated ? 'hospital' : (gameShowInfoQuery.data?.place?.id ?? 'road'),
  )

  const handleEnteredPlaceChange: EnterPlaceChangeEvent = (place) => setSelectedLocation(place)

  if (gameShowInfoQuery.derived.hasCombat) return <Combat />
  if (gameShowInfoQuery.derived.hasLoot) return <Loot />
  if (gameShowInfoQuery.derived.hasPlace)
    return <Place enteredPlace={selectedLocation} onEnteredPlaceChange={handleEnteredPlaceChange} />

  return <Explore />
}

function useSetLocation(location?: Location) {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>()

  useSetLocationBackgroundEffect(selectedLocation)

  React.useEffect(() => setSelectedLocation(location), [location])

  return { selectedLocation, setSelectedLocation }
}
