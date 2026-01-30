import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Map as MapIcon } from 'lucide-react'

import { getMapPageData } from '@/lib/loaders/map-loader'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { GameMap } from '@/components/features/Map'
import type { QuestMarker } from '@/components/features/Map/Shared/types'
import { PageLayout } from '@/components/layout/PageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mapa | Land of Machala',
  description: 'Prozkoumej svět Machala a objev nová místa.',
}

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>
}) {
  const data = await getMapPageData()
  const resolvedParams = await searchParams

  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={<GameHeader title="Mapa světa" icon={MapIcon} />}
      footer={<GameFooter />}
      showInfoLog={false}
    >
      <GameMap
        locations={data.serializedLocations}
        discoveredLocations={data.discoveredLocations}
        questMarkers={data.questMarkers as QuestMarker[]}
        deathLocation={data.deathLocation as unknown as { x: number; y: number }}
        searchParams={resolvedParams}
      />
    </PageLayout>
  )
}
