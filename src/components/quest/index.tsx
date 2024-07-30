// 'use client'

// import React from 'react'
// import { api } from '@/trpc/react'
// import { usePageContext } from '@/context/game-provider'

// import * as S from './index.styles'
// import { H3 } from '@/styles/text'
// import { Table } from '../table'
// import { Button } from '../ui/button'
// import { ChevronLeftIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

// export default function Quest() {
//   const { setPage } = usePageContext()

//   const handleBackClick = React.useCallback(() => setPage?.('game'), [setPage])

//   const show = api.quest.show.useQuery()

//   if (show.isLoading) return <></>

//   const slainEnemyQuest = show.data?.quest_slain_enemy
//   const slainTrollQuest = show.data?.quest_slain_troll

//   const hasSlainEnemyQuest = slainEnemyQuest?.id !== undefined
//   const hasSlainTrollQuest = slainTrollQuest?.id !== undefined

//   const BackBtn = (
//     <Button variant='default' onClick={handleBackClick}>
//       <ChevronLeftIcon />
//       &nbsp; Zpět do světa
//     </Button>
//   )

//   if (!hasSlainEnemyQuest && !hasSlainTrollQuest)
//     return (
//       <S.Info>
//         {BackBtn}
//         <br />
//         <br />
//         <H3>Žádný quest nemáš</H3>
//       </S.Info>
//     )

//   const quests = []

//   if (hasSlainEnemyQuest) {
//     quests.push(
//       buildQuest(
//         slainEnemyQuest!.ident,
//         <>
//           popis slain enemy questu
//           <br />
//           <br />
//           <b>
//             Zabito nepřátel: {slainEnemyQuest.slain.actual_slain}/{slainEnemyQuest.slain.desired_slain}
//           </b>
//         </>,
//         show.data!.quest_slain_enemy_complete,
//       ),
//     )
//   }
//   if (hasSlainTrollQuest) {
//     quests.push(buildQuest(slainTrollQuest!.ident, 'popis slain troll questu', show.data!.quest_slain_troll_complete))
//   }

//   return (
//     <S.Info>
//       {BackBtn}
//       <br />
//       <br />
//       <H3>Questy:</H3>
//       <br />
//       <S.Quest>
//         <Table hideHeader columns={[{}, {}, {}]} cells={quests} />
//       </S.Quest>
//     </S.Info>
//   )
// }

// function buildQuest(name: string, description: React.ReactNode, done: boolean) {
//   return [
//     { className: 'text-left', content: name },
//     {
//       className: 'text-center',
//       content: description,
//     },
//     {
//       content: done ? <CheckIcon className='m-auto' /> : <Cross2Icon className='m-auto' />,
//     },
//   ]
// }

export default function Page() {
  return <></>
}