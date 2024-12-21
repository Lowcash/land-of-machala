'use client'

import { usePlayerQuery, usePlayerStatsQuery } from '@/hooks/api/usePlayer'
import { useWearableQuery } from '@/hooks/api/useWearable'

import Sidebar from '@/app/(game)/_components/Sidebar'
import Content from '@/app/(game)/_components/Sidebar/Left/Content'
import Progress from '@/components/ui/Progress'

const EMPTY = '-'

export default function SidebarLeft() {
  const playerQuery = usePlayerQuery()
  const playerStatsQuery = usePlayerStatsQuery()
  const playerWearableQuery = useWearableQuery()

  if (playerQuery.isLoading || playerStatsQuery.isLoading || playerWearableQuery.isLoading) return <></>

  return (
    <Sidebar open={true} position='left'>
      <Content
        data={[
          {
            header: 'Postava',
            items: [
              { label: 'Jméno:', value: playerQuery.data?.name ?? '' },
              { label: 'Rasa:', value: playerQuery.data?.race ?? '' },
              { label: 'Profese:', value: playerQuery.data?.profession ?? '' },
            ],
          },
          { header: 'Peníze', items: [{ value: `${playerQuery.data?.money ?? 0} zl` }] },
          {
            header: 'HP',
            items: [
              {
                value: (
                  <Progress value={playerQuery.data?.hp_actual ?? 0} max={playerQuery.data?.hp_max ?? 0} variant='red'>
                    {playerQuery.data?.hp_actual ?? 0} / {playerQuery.data?.hp_max ?? 0}
                  </Progress>
                ),
              },
            ],
          },
          {
            header: 'Zbraně',
            items: [
              { label: 'Levá ruka:', value: playerWearableQuery.data?.left_hand?.weapon.name ?? EMPTY },
              { label: 'Pravá ruka:', value: playerWearableQuery.data?.right_hand?.weapon.name ?? EMPTY },
            ],
          },
          {
            header: 'Zbroj',
            items: [
              { label: 'Hlava:', value: playerWearableQuery.data?.head?.armor.name ?? EMPTY },
              { label: 'Ramena:', value: playerWearableQuery.data?.shoulder?.armor.name ?? EMPTY },
              { label: 'Tělo:', value: playerWearableQuery.data?.chest?.armor.name ?? EMPTY },
              { label: 'Ruce:', value: playerWearableQuery.data?.hand?.armor.name ?? EMPTY },
              { label: 'Kalhoty:', value: playerWearableQuery.data?.pants?.armor.name ?? EMPTY },
              { label: 'Boty:', value: playerWearableQuery.data?.boots?.armor.name ?? EMPTY },
            ],
          },
          {
            header: 'Staty',
            items: [
              { label: 'Level:', value: `${playerStatsQuery.data?.level}` },
              {
                label: 'Poškození:',
                value: `${playerStatsQuery.data?.damage_min} - ${playerStatsQuery.data?.damage_max}`,
              },
              { label: 'Síla:', value: `${playerStatsQuery.data?.strength}` },
              { label: 'Obratnost:', value: `${playerStatsQuery.data?.agility}` },
              { label: 'Inteligence:', value: `${playerStatsQuery.data?.intelligence}` },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
