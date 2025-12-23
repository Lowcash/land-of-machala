import { QuestPanel } from '@/components/features/Quest/QuestPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { ScrollText } from 'lucide-react'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function QuestsPage() {
  return (
    <PageTemplate title="Questy" icon={<ScrollText />} backUrl="/game">
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <QuestPanel />
      </Suspense>
    </PageTemplate>
  )
}
