import { GameFooter, GameHeader } from '@/components/features/Game'
import { QuestClient } from '@/components/features/Quest'
import { PageLayout } from '@/components/layout/PageLayout'
import { getQuestPageData } from '@/lib/loaders/quest-loader'
import { ScrollText } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QuestsPage() {
  const data = await getQuestPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={
        <GameHeader
          title="Quest Log"
          icon={ScrollText}
          backLink={{ href: '/game', label: 'Zpět do hry' }}
        />
      }
      footer={<GameFooter />}
      maxWidth="lg"
    >
      <QuestClient quests={data.quests} characterId={data.characterId} />
    </PageLayout>
  )
}
