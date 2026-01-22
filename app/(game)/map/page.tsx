import { MapClient } from '@/components/features/Map'
import { PageTemplate } from '@/components/layout/PageTemplate'
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
    <PageTemplate
      title="Mapa"
      icon={<MapIcon />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={data.characterId}
    >
      <MapClient
        locations={data.serializedLocations}
        discoveredLocations={data.discoveredLocations}
        questMarkers={data.questMarkers}
        deathLocation={data.deathLocation as any}
      />
    </PageTemplate>
  )
}
