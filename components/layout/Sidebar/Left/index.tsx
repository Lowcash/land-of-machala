'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'
import { useStatsShowQuery } from '@/hooks/api/use-stats'
import { useWearableShowQuery } from '@/hooks/api/use-wearable'

import Sidebar from '@/components/layout/Sidebar'
import SidebarLeftContent from '@/components/layout/Sidebar/Left/Content'
import Progress from '@/components/ui/progress'
import Loading from '@/components/Loading'

import { EMPTY } from '@/config'

export default function SidebarLeft() {
  const playerShowQuery = usePlayerShowQuery()
  const wearableShowQuery = useWearableShowQuery()
  const statsShowQuery = useStatsShowQuery()

  if (playerShowQuery.isLoading || wearableShowQuery.isLoading || statsShowQuery.isLoading)
    return <Loading position='local' />

  return (
    <Sidebar open={true} position='left'>
      <SidebarLeftContent
        data={[
          {
            header: playerShowQuery.data?.text.character ?? 'character',
            items: [
              { label: `${playerShowQuery.data?.text.character ?? 'character'}:`, value: playerShowQuery.data?.name },
              {
                label: `${playerShowQuery.data?.text.race ?? 'race'}:`,
                value: playerShowQuery.data?.race?.name,
              },
              {
                label: `${playerShowQuery.data?.text.class ?? 'class'}:`,
                value: playerShowQuery.data?.class?.name,
              },
            ],
          },
          {
            header: `${playerShowQuery.data?.text.money ?? 'money'}:`,
            items: [{ value: `${playerShowQuery.data?.money ?? 0} ${playerShowQuery.data?.text.currency}` }],
          },
          {
            header: `${playerShowQuery.data?.text.hp ?? 'HP'}:`,
            items: [
              {
                value: (
                  <Progress
                    value={playerShowQuery.data?.hp_actual ?? 0}
                    max={playerShowQuery.data?.hp_max ?? 0}
                    variant='red'
                  >
                    {playerShowQuery.data?.hp_actual ?? 0} / {playerShowQuery.data?.hp_max ?? 0}
                  </Progress>
                ),
              },
            ],
          },
          {
            header: wearableShowQuery.data?.text.weapon_multi ?? 'weapon_multi',
            items: [
              {
                label: `${wearableShowQuery.data?.text.left_hand ?? 'left_hand'}:`,
                value: wearableShowQuery.data?.left_hand?.weapon?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.right_hand ?? 'right_hand'}:`,
                value: wearableShowQuery.data?.right_hand?.weapon?.name ?? EMPTY,
              },
            ],
          },
          {
            header: wearableShowQuery.data?.text.armor_multi ?? 'armor_multi',
            items: [
              {
                label: `${wearableShowQuery.data?.text.head ?? 'head'}:`,
                value: wearableShowQuery.data?.head?.armor?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.shoulder ?? 'shoulder'}:`,
                value: wearableShowQuery.data?.shoulder?.armor?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.chest ?? 'chest'}:`,
                value: wearableShowQuery.data?.chest?.armor?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.hand ?? 'hand'}:`,
                value: wearableShowQuery.data?.hand?.armor?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.pants ?? 'pants'}:`,
                value: wearableShowQuery.data?.pants?.armor?.name ?? EMPTY,
              },
              {
                label: `${wearableShowQuery.data?.text.boots ?? 'boots'}:`,
                value: wearableShowQuery.data?.boots?.armor?.name ?? EMPTY,
              },
            ],
          },
          {
            header: statsShowQuery.data?.text.header ?? 'stats',
            items: [
              {
                label: `${playerShowQuery.data?.text.level ?? 'level'}:`,
                value: `${playerShowQuery.data?.level ?? EMPTY}`,
              },
              {
                label: `${statsShowQuery.data?.text.damage ?? 'damage'}:`,
                value: `${statsShowQuery.data?.damage?.min ?? EMPTY} - ${statsShowQuery.data?.damage?.max ?? EMPTY}`,
              },
              {
                label: `${statsShowQuery.data?.text.strength ?? 'strength'}:`,
                value: `${statsShowQuery.data?.strength ?? EMPTY}`,
              },
              {
                label: `${statsShowQuery.data?.text.agility ?? 'agility'}:`,
                value: `${statsShowQuery.data?.agility ?? EMPTY}`,
              },
              {
                label: `${statsShowQuery.data?.text.intelligence ?? 'intelligence'}:`,
                value: `${statsShowQuery.data?.intelligence ?? EMPTY}`,
              },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
