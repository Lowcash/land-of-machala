'use client'

import React from 'react'
import { api } from '@/trpc/react'

import * as S from './index.styles'
import { H3 } from '@/styles/text'
import { Table } from '../table'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

export default function Quest() {
  const { player, inventory } = api.useUtils()
  const show = api.quest.show.useQuery()

  const hasSlainEnemyQuest = show.data?.quest_slain_enemy?.id !== undefined
  const hasSlainTrollQuest = show.data?.quest_slain_troll?.id !== undefined

  if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
    return (
      <S.Info>
        <H3>Žádný quest nemáš</H3>
      </S.Info>
    )

  const quests = []

  if (hasSlainEnemyQuest) {
    quests.push(
      buildQuest(show.data!.quest_slain_enemy!.ident, 'popis slain enemy questu', show.data!.quest_slain_enemy_done),
    )
  }
  if (hasSlainTrollQuest) {
    quests.push(
      buildQuest(show.data!.quest_slain_troll!.ident, 'popis slain troll questu', show.data!.quest_slain_troll_done),
    )
  }

  return (
    <S.Info>
      <H3>Questy:</H3>
      <br />
      <S.Quest>
        <Table hideHeader columns={[{}, {}, {}]} cells={quests} />
      </S.Quest>
    </S.Info>
  )
}

function buildQuest(name: string, description: string, done: boolean) {
  return [
    { className: 'text-left', content: name },
    {
      className: 'text-center',
      content: description,
    },
    {
      className: 'text-center',
      content: done ? <CheckIcon /> : <Cross2Icon />,
    },
  ]
}
