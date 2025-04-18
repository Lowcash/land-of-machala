'use client'

import i18n from '@/lib/i18n'
import { usePlayerShowQuery, usePlayerStatsShowQuery } from '@/hooks/api/use-player'
import { useWearableQuery } from '@/hooks/api/use-wearable'

import Sidebar from '@/components/layout/Sidebar'
import Content from '@/components/layout/Sidebar/Left/Content'
import Progress from '@/components/ui/progress'

import { EMPTY } from '@/config'

export default function SidebarLeft() {
  const playerShowQuery = usePlayerShowQuery()
  const playerStatsShowQuery = usePlayerStatsShowQuery()
  const playerWearableQuery = useWearableQuery()

  if (playerShowQuery.isLoading || playerStatsShowQuery.isLoading || playerWearableQuery.isLoading) return <></>

  return (
    <Sidebar open={true} position='left'>
      <Content
        data={[
          {
            header: i18n.t('player.character'),
            items: [
              { label: `${i18n.t('player.name')}:`, value: playerShowQuery.data?.name },
              {
                label: `${i18n.t('player.race')}:`,
                value: i18n.t(`${playerShowQuery.data?.race?.i18n_key}.header` as any),
              },
              {
                label: `${i18n.t('player.class')}:`,
                value: i18n.t(`${playerShowQuery.data?.class?.i18n_key}.header` as any),
              },
            ],
          },
          {
            header: `${i18n.t('player.money')}:`,
            items: [{ value: `${playerShowQuery.data?.money ?? 0} ${i18n.t('common.currency')}` }],
          },
          {
            header: `${i18n.t('common.hp')}:`,
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
            header: i18n.t('weapon.header_multi'),
            items: [
              {
                label: `${i18n.t('weapon.left_hand')}:`,
                value: playerWearableQuery.data?.left_hand?.weapon.i18n_key ?? EMPTY,
              },
              {
                label: `${i18n.t('weapon.right_hand')}:`,
                value: playerWearableQuery.data?.right_hand?.weapon.i18n_key ?? EMPTY,
              },
            ],
          },
          {
            header: i18n.t('armor.header'),
            items: [
              { label: `${i18n.t('armor.head')}:`, value: playerWearableQuery.data?.head?.armor.i18n_key ?? EMPTY },
              {
                label: `${i18n.t('armor.shoulder')}:`,
                value: playerWearableQuery.data?.shoulder?.armor.i18n_key ?? EMPTY,
              },
              {
                label: `${i18n.t('armor.chest')}:`,
                value: playerWearableQuery.data?.chest?.armor.i18n_key ?? EMPTY,
              },
              { label: `${i18n.t('armor.hand')}:`, value: playerWearableQuery.data?.hand?.armor.i18n_key ?? EMPTY },
              {
                label: `${i18n.t('armor.pants')}:`,
                value: playerWearableQuery.data?.pants?.armor.i18n_key ?? EMPTY,
              },
              {
                label: `${i18n.t('armor.boots')}:`,
                value: playerWearableQuery.data?.boots?.armor.i18n_key ?? EMPTY,
              },
            ],
          },
          {
            header: i18n.t('stats.header'),
            items: [
              { label: `${i18n.t('stats.level')}:`, value: `${playerStatsShowQuery.data?.level}` },
              {
                label: `${i18n.t('stats.damage')}:`,
                value: `${playerStatsShowQuery.data?.damage.min} - ${playerStatsShowQuery.data?.damage.max}`,
              },
              { label: `${i18n.t('stats.strength')}:`, value: `${playerStatsShowQuery.data?.strength}` },
              { label: `${i18n.t('stats.agility')}:`, value: `${playerStatsShowQuery.data?.agility}` },
              { label: `${i18n.t('stats.intelligence')}:`, value: `${playerStatsShowQuery.data?.intelligence}` },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
