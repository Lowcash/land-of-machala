'use client'

import { Suspense } from 'react'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useQuestShowAssignedQuery } from '@/hooks/api/use-quest'
import type { SafeActionResultData } from '@/lib/safe-action-client-utils'
import type { showAssigned } from '@/app/actions/quest'

import { RxCheck, RxCross1 } from 'react-icons/rx'
import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import Table from '@/components/Table'
import { Back } from '@/components/app/Back'

interface QuestClientProps {
  initialData?: SafeActionResultData<typeof showAssigned>
}

export function QuestClient({ initialData }: QuestClientProps) {
  const commonShowQuery = useCommonShowQuery()
  const questShowAssignedQuery = useQuestShowAssignedQuery(undefined, {
    initialData,
    staleTime: 0,
  })

  useSetLocationBackgroundEffect('quest')

  const slainEnemyQuest = questShowAssignedQuery.data?.quest_slain_enemy
  const slainTrollQuest = questShowAssignedQuery.data?.quest_slain_troll

  const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
  const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

  return (
    <Suspense
      fallback={
        <Card>
          <H3>Loading quests...</H3>
        </Card>
      }
    >
      {!hasSlainEnemyQuest && !hasSlainTrollQuest ? (
        <Card>
          <Back />

          <H3>{commonShowQuery.data?.text.questEmpty ?? 'quest_empty'}</H3>
        </Card>
      ) : (
        <Card>
          <Back />

          <Card.Inner>
            <H3>{commonShowQuery.data?.text.questHeader ?? 'quest_header'}:</H3>
            <Table hideHeader columns={[{}, {}, {}]} cells={buildQuests(questShowAssignedQuery.data)} />
          </Card.Inner>
        </Card>
      )}
    </Suspense>
  )
}

function buildQuests(data?: SafeActionResultData<typeof showAssigned>) {
  const quests = []
  const slainEnemyQuest = data?.quest_slain_enemy
  const slainTrollQuest = data?.quest_slain_troll

  if (slainEnemyQuest?.id)
    quests.push(
      buildQuest(
        slainEnemyQuest.quest.name ?? 'quest_slain_enemy',
        data?.quest_slain_enemy?.text.description ?? 'quest_slain_enemy_description',
        <b>
          {data?.quest_slain_enemy?.text.slained ?? 'quest_slain_enemy_slained'}: {slainEnemyQuest.slain.actual_slain}/
          {slainEnemyQuest.slain.desired_slain}
        </b>,
        !!data?.quest_slain_enemy_complete,
      ),
    )

  if (slainTrollQuest?.id)
    quests.push(
      buildQuest(
        slainTrollQuest.quest.name ?? 'quest_slain_troll',
        data?.quest_slain_troll?.text.description ?? 'quest_slain_troll_description',
        <b>
          {data?.quest_slain_troll?.text.slained ?? 'quest_slain_troll_slained'}: {slainTrollQuest.slain.actual_slain}/
          {slainTrollQuest.slain.desired_slain}
        </b>,
        !!data?.quest_slain_troll_complete,
      ),
    )

  return quests
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
