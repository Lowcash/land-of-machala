import { QuestClient } from '@/components/features/Quest'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getQuestPageData } from '@/lib/loaders/quest-loader'
import { ScrollText } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QuestsPage() {
  const data = await getQuestPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageTemplate
      title="Questy"
      icon={<ScrollText />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={data.characterId}
    >
      <QuestClient quests={data.quests} characterId={data.characterId} />
    </PageTemplate>
  )
}
