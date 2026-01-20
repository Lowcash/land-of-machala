import { CharacterPanel } from '@/components/features/Character/CharacterPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { User } from 'lucide-react'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function CharacterPage() {
  return (
    <PageTemplate
      title="Hrdina"
      icon={<User />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
    >
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <CharacterPanel />
      </Suspense>
    </PageTemplate>
  )
}
