import { loc } from '@/localization'

import * as QuestAction from '@/server/actions/quest'

import { FaCheck, FaTimes } from 'react-icons/fa'
import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import Table from '@/components/table'
import Back from '@/app/(game)/world/_components/Back'
import Alert from '@/components/alert'

export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    const userQuests = await QuestAction.getAssignedQuests()

    const slainEnemyQuest = userQuests.quest_slain_enemy
    const slainTrollQuest = userQuests.quest_slain_troll

    const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
    const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

    if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
      return (
        <Card>
          <Back />

          <H3>{loc.quest.empty}</H3>
        </Card>
      )

    const quests = []

    if (hasSlainEnemyQuest)
      quests.push(
        buildQuest(
          slainEnemyQuest.ident,
          loc.quest.enemy_slain.description_inventory,
          <b>
            {loc.quest.enemy_slain.slained}: {slainEnemyQuest.slain.actual_slain}/{slainEnemyQuest.slain.desired_slain}
          </b>,
          userQuests.quest_slain_enemy_complete,
        ),
      )

    if (hasSlainTrollQuest)
      quests.push(
        buildQuest(
          slainTrollQuest.ident,
          loc.quest.troll_slain.description_inventory,
          <b>
            {loc.quest.enemy_slain.slained}: {slainTrollQuest.slain.actual_slain}/{slainTrollQuest.slain.desired_slain}
          </b>,
          userQuests.quest_slain_troll_complete,
        ),
      )

    return (
      <Card>
        <Back />

        <Card.Inner>
          <H3>{loc.quest.header_multi}:</H3>
          <Table hideHeader columns={[{}, {}, {}]} cells={quests} />
        </Card.Inner>
      </Card>
    )
  } catch (error: any) {
    return <Alert variant='destructive'>{error?.message}</Alert>
  }
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
      content: done ? <FaCheck className='m-auto -mt-0.5' /> : <FaTimes className='m-auto -mt-0.5' />,
    },
  ]
}
