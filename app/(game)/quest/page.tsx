'use client'

import { useSetLocationBackgroundEffect } from '@/context/game-provider'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useQuestShowAssignedQuery } from '@/hooks/api/use-quest'

import { RxCheck, RxCross1 } from 'react-icons/rx'
import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import Table from '@/components/table'
import Back from '@/app/(game)/world/_components/Back'

export default function Page() {
  const commonShowQuery = useCommonShowQuery()
  const questShowAssignedQuery = useQuestShowAssignedQuery()

  useSetLocationBackgroundEffect('quest')
  
  const slainEnemyQuest = questShowAssignedQuery.data?.quest_slain_enemy
  const slainTrollQuest = questShowAssignedQuery.data?.quest_slain_troll

  const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
  const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

  if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
    return (
      <Card>
        <Back />

        <H3>{commonShowQuery.data?.text.questEmpty ?? 'quest_empty'}</H3>
      </Card>
    )

  const quests = []

  if (hasSlainEnemyQuest)
    quests.push(
      buildQuest(
        slainEnemyQuest.quest.name ?? 'quest_slain_enemy',
        questShowAssignedQuery.data?.quest_slain_enemy?.text.description ?? 'quest_slain_enemy_description',
        <b>
          {questShowAssignedQuery.data?.quest_slain_enemy?.text.slained ?? 'quest_slain_enemy_slained'}:{' '}
          {slainEnemyQuest.slain.actual_slain}/{slainEnemyQuest.slain.desired_slain}
        </b>,
        !!questShowAssignedQuery.data?.quest_slain_enemy_complete,
      ),
    )

  if (hasSlainTrollQuest)
    quests.push(
      buildQuest(
        slainTrollQuest.quest.name ?? 'quest_slain_troll',
        questShowAssignedQuery.data?.quest_slain_enemy?.text.description ?? 'quest_slain_troll_description',
        <b>
          {questShowAssignedQuery.data?.quest_slain_enemy?.text.slained ?? 'quest_slain_troll_slained'}:{' '}
          {slainTrollQuest.slain.actual_slain}/{slainTrollQuest.slain.desired_slain}
        </b>,
        !!questShowAssignedQuery.data?.quest_slain_enemy_complete,
      ),
    )

  return (
    <Card>
      <Back />

      <Card.Inner>
        <H3>{commonShowQuery.data?.text.questHeader ?? 'quest_header'}:</H3>
        <Table hideHeader columns={[{}, {}, {}]} cells={quests} />
      </Card.Inner>
    </Card>
  )
}

function buildQuest(name: string, description: React.ReactNode, progress: React.ReactNode, done: boolean) {
  return [
    { className: 'text-left', content: name },
    {
      className: 'text-center',
      content: description,
    },
    {
      className: 'text-center',
      content: progress,
    },
    {
      content: done ? <RxCheck className='m-auto -mt-0.5' /> : <RxCross1 className='m-auto -mt-0.5' />,
    },
  ]
}
