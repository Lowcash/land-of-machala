'use client'

import i18n from '@/lib/i18n'
import { useBackground } from '@/context/game-provider'
import { useQuestAssignedQuery } from '@/hooks/api/use-quest'

import { RxCheck, RxCross1 } from 'react-icons/rx'
import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import Table from '@/components/table'
import Back from '@/app/(game)/world/_components/Back'

export default function Page() {
  useBackground('quest')

  const questAssignedQuery = useQuestAssignedQuery()

  const slainEnemyQuest = questAssignedQuery.data?.quest_slain_enemy
  const slainTrollQuest = questAssignedQuery.data?.quest_slain_troll

  const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
  const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

  if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
    return (
      <Card>
        <Back />

        <H3>{i18n.t('quest.empty')}</H3>
      </Card>
    )

  const quests = []

  if (hasSlainEnemyQuest)
    quests.push(
      buildQuest(
        slainEnemyQuest.id,
        i18n.t('quest.slain_enemy.description_inventory'),
        <b>
          {i18n.t('quest.slain_enemy.slained')}: {slainEnemyQuest.slain.actual_slain}/
          {slainEnemyQuest.slain.desired_slain}
        </b>,
        !!questAssignedQuery.data?.quest_slain_enemy_complete,
      ),
    )

  if (hasSlainTrollQuest)
    quests.push(
      buildQuest(
        slainTrollQuest.id,
        i18n.t('quest.slain_troll.description_inventory'),
        <b>
          {i18n.t('quest.slain_troll.slained')}: {slainTrollQuest.slain.actual_slain}/
          {slainTrollQuest.slain.desired_slain}
        </b>,
        !!questAssignedQuery.data?.quest_slain_troll_complete,
      ),
    )

  return (
    <Card>
      <Back />

      <Card.Inner>
        <H3>{i18n.t('quest.header_multi')}:</H3>
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
