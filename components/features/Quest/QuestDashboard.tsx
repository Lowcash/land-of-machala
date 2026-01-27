import { ScrollText } from 'lucide-react'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'

import { QuestDetailContent } from './Detail/QuestDetailContent'
import { QuestListWrapper } from './QuestListWrapper'
import type { MergedQuest } from './Shared/types'

interface QuestDashboardProps {
  quests: MergedQuest[]
  searchParams: { questId?: string }
}

export function QuestDashboard({ quests, searchParams }: QuestDashboardProps) {
  const selectedQuestId = searchParams?.questId || null
  const selectedQuest = quests.find((q) => q.id === selectedQuestId) || null

  return (
    <PageLayout
      header={<GameHeader title="Deník úkolů" icon={ScrollText} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      showInfoLog={false}
    >
      <SplitLayout
        asideWidth="lg"
        hideMobileAside={!selectedQuestId}
        main={
          <div className="flex h-full p-4">
            <QuestListWrapper quests={quests} selectedQuestId={selectedQuestId} />
          </div>
        }
        aside={
          selectedQuest ? (
            <QuestDetailContent quest={selectedQuest} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-[#8b7355] italic">
              Vyber quest ze seznamu pro zobrazení detailů.
            </div>
          )
        }
      />
    </PageLayout>
  )
}
