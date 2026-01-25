import { GameFooter, GameHeader } from '@/components/features/Game'
import { MapClient } from '@/components/features/Map'
import { PageLayout } from '@/components/layout/PageLayout'
import { auth } from '@/lib/auth'
import { getMapPageData } from '@/lib/loaders/map-loader'
import { Map as MapIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function MapPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const data = await getMapPageData(session.user.id)
  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={<GameHeader title="Mapa světa" icon={MapIcon} />}
      footer={<GameFooter />}
      showInfoLog={false}
    >
      <MapClient
        locations={data.serializedLocations}
        discoveredLocations={data.discoveredLocations}
        questMarkers={data.questMarkers as unknown[]}
        deathLocation={data.deathLocation as unknown as { x: number; y: number }}
      />
    </PageLayout>
  )
}
