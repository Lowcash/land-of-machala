import { SkillsPanel } from '@/components/features/Skills/SkillsPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { Zap } from 'lucide-react'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function SkillsPage() {
  return (
    <PageTemplate
      title="Dovednosti"
      icon={<Zap />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
    >
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <SkillsPanel />
      </Suspense>
    </PageTemplate>
  )
}
