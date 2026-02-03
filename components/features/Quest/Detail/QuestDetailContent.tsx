import { Badge } from '@/components/ui/badge'
import { DetailLayout, DetailRow } from '@/components/ui/display'
import { Progress } from '@/components/ui/progress'
import { HStack, VStack } from '@/components/ui/stack'
import { P, Span } from '@/components/ui/typography'

import type { MergedQuest } from '../Shared/types'
import { getCategoryBadge, getCategoryName } from '../Shared/utils'
import { QuestActions } from './QuestActions'
import { QuestInfoPanel } from './QuestInfoPanel'
import { QuestObjectivesList } from './QuestObjectivesList'
import { QuestRewardsList } from './QuestRewardsList'

interface QuestDetailContentProps {
  quest: MergedQuest
}

export function QuestDetailContent({ quest }: QuestDetailContentProps) {
  const subtitle = (
    <HStack align="center" gap="sm">
      <Badge variant={getCategoryBadge(quest.category)}>{getCategoryName(quest.category)}</Badge>
      <Span color="muted" size="sm">
        Level {quest.level || 1}
      </Span>
    </HStack>
  )

  const footer = (
    <VStack fullWidth>
      <QuestActions quest={quest} />
    </VStack>
  )

  return (
    <DetailLayout title={quest.title} subtitle={subtitle} footer={footer} onClose="?">
      <VStack gap="xl">
        <P color="copper">{quest.description}</P>

        <QuestInfoPanel giver={quest.giver} location={quest.location} story={quest.story} />

        <QuestObjectivesList objectives={quest.objectives} />

        <QuestRewardsList
          rewardXp={quest.rewardXp}
          rewardGold={quest.rewardGold}
          rewards={quest.rewards}
        />

        {/* Progress bar for active quests */}
        {quest.characterStatus === 'ACTIVE' && (
          <VStack gap="sm">
            <VStack gap="xs">
              <DetailRow label="Dosavadní pokrok" value={`${quest.progress}%`} py="none" />
              <VStack fullWidth>
                <Progress value={quest.progress} />
              </VStack>
            </VStack>
          </VStack>
        )}
      </VStack>
    </DetailLayout>
  )
}
