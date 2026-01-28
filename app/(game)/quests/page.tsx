import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ScrollText } from 'lucide-react'

import { getQuestPageData } from '@/lib/loaders/quest-loader'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { Quest } from '@/components/features/Quest'
import { PageLayout } from '@/components/layout/PageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Úkoly | Land of Machala',
  description: 'Sleduj svůj postup v plnění úkolů a výzev.',
}

export default async function QuestsPage({ searchParams }: { searchParams: { questId?: string } }) {
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
      <Quest quests={data.quests} searchParams={searchParams} />
    </PageLayout>
  )
}
