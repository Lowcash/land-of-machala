import { CharacterPanel } from '@/components/features/Character/CharacterPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { User } from 'lucide-react'
import { Suspense } from 'react'

export default function CharacterPage() {
  return (
    <PageTemplate
      title="Postava"
      icon={<User />}
      backgroundImage="/assets/locations/city-background.jpg"
    >
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <CharacterPanel />
      </Suspense>
    </PageTemplate>
  )
}
