import { getUserQuests } from '@/server/actions/quest'

import * as S from './styles'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Card } from '@/styles/common-server'
import { H3 } from '@/styles/text-server'
import Back from './_components/Back'
import Table from '@/components/table'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const userQuests = await getUserQuests()

  const slainEnemyQuest = userQuests.quest_slain_enemy
  const slainTrollQuest = userQuests.quest_slain_troll

  const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
  const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

  if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
    return (
      <Card>
        <Back />
        <br />
        <br />
        <H3>Žádný quest nemáš</H3>
      </Card>
    )

  const quests = []

  if (hasSlainEnemyQuest)
    quests.push(
      buildQuest(
        slainEnemyQuest.ident,
        <>
          popis slain enemy questu
          <br />
          <br />
          <b>
            Zabito nepřátel: {slainEnemyQuest.slain.actual_slain}/{slainEnemyQuest.slain.desired_slain}
          </b>
        </>,
        userQuests.quest_slain_enemy_complete,
      ),
    )

  if (hasSlainTrollQuest)
    quests.push(buildQuest(slainTrollQuest.ident, 'popis slain troll questu', userQuests.quest_slain_troll_complete))

  return (
    <Card>
      <Back />
      <br />
      <br />
      <H3>Questy:</H3>
      <br />
      <S.Quest>
        <Table hideHeader columns={[{}, {}, {}]} cells={quests} />
      </S.Quest>
    </Card>
  )
}

function buildQuest(name: string, description: React.ReactNode, done: boolean) {
  return [
    { className: 'text-left', content: name },
    {
      className: 'text-center',
      content: description,
    },
    {
      content: done ? <FaCheck className='m-auto' /> : <FaTimes className='m-auto' />,
    },
  ]
}
