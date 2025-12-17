import { MapPanel } from '@/components/features/Map/MapPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { Map as MapIcon } from 'lucide-react'
import { Suspense } from 'react'

export default function MapPage() {
  return (
    <PageTemplate title="Mapa" icon={<MapIcon />} backgroundImage="/assets/city-background.jpg">
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <MapPanel />
      </Suspense>
    </PageTemplate>
  )
}
