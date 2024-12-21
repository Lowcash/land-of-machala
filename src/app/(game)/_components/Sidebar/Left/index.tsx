'use client'

import { loc } from '@/local'
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
            header: loc.player.character,
            items: [
              { label: `${loc.player.name}:`, value: playerQuery.data?.name ?? '' },
              { label: `${loc.player.race}:`, value: playerQuery.data?.race ?? '' },
              { label: `${loc.player.profession}:`, value: playerQuery.data?.profession ?? '' },
            ],
          },
          {
            header: `${loc.player.money}:`,
            items: [{ value: `${playerQuery.data?.money ?? 0} ${loc.common.currency}` }],
          },
          {
            header: `${loc.player.hp}:`,
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
            header: loc.weapon.header_multi,
            items: [
              { label: `${loc.weapon.left_hand}:`, value: playerWearableQuery.data?.left_hand?.weapon.name ?? EMPTY },
              { label: `${loc.weapon.right_hand}:`, value: playerWearableQuery.data?.right_hand?.weapon.name ?? EMPTY },
            ],
          },
          {
            header: loc.armor.header,
            items: [
              { label: `${loc.armor.head}:`, value: playerWearableQuery.data?.head?.armor.name ?? EMPTY },
              { label: `${loc.armor.shoulder}:`, value: playerWearableQuery.data?.shoulder?.armor.name ?? EMPTY },
              { label: `${loc.armor.chest}:`, value: playerWearableQuery.data?.chest?.armor.name ?? EMPTY },
              { label: `${loc.armor.hand}:`, value: playerWearableQuery.data?.hand?.armor.name ?? EMPTY },
              { label: `${loc.armor.pants}:`, value: playerWearableQuery.data?.pants?.armor.name ?? EMPTY },
              { label: `${loc.armor.boots}:`, value: playerWearableQuery.data?.boots?.armor.name ?? EMPTY },
            ],
          },
          {
            header: loc.stats.header,
            items: [
              { label: `${loc.stats.level}:`, value: `${playerStatsQuery.data?.level}` },
              {
                label: `${loc.stats.damage}:`,
                value: `${playerStatsQuery.data?.damage_min} - ${playerStatsQuery.data?.damage_max}`,
              },
              { label: `${loc.stats.strength}:`, value: `${playerStatsQuery.data?.strength}` },
              { label: `${loc.stats.agility}:`, value: `${playerStatsQuery.data?.agility}` },
              { label: `${loc.stats.intelligence}:`, value: `${playerStatsQuery.data?.intelligence}` },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
