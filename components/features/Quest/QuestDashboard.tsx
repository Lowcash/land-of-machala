import { Scroll } from 'lucide-react'

import { SplitLayout } from '@/components/layout'
import { StatDisplay } from '@/components/ui/display'
import { InfoBar } from '@/components/ui/info-bar'
import { VStack } from '@/components/ui/stack'
import { P } from '@/components/ui/typography'

import { QuestDetailContent } from './Detail/QuestDetailContent'
import { QuestList } from './List/QuestList'
import type { MergedQuest } from './Shared/types'

interface QuestDashboardProps {
  quests: MergedQuest[]
  searchParams: { questId?: string }
}

export function QuestDashboard({ quests, searchParams }: QuestDashboardProps) {
  const selectedQuestId = searchParams?.questId || null
  const selectedQuest = quests.find((q) => q.id === selectedQuestId) || null

  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={!selectedQuestId}
      main={
        <VStack fullHeight gap="none" fullWidth>
          <InfoBar>
            <StatDisplay
              icon={Scroll}
              label="Aktivní Questy"
              value={quests.length}
              color="gold"
              size="sm"
            />
          </InfoBar>
          <VStack flex="1" p="md" fullWidth>
            <QuestList quests={quests} selectedQuest={selectedQuestId} />
          </VStack>
        </VStack>
      }
      aside={
        selectedQuest ? (
          <QuestDetailContent quest={selectedQuest} />
        ) : (
          <VStack fullHeight justify="center" align="center" p="xl">
            <P color="muted" align="center" italic>
              Vyber quest ze seznamu pro zobrazení detailů.
            </P>
          </VStack>
        )
      }
    />
  )
}
