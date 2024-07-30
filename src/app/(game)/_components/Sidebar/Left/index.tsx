import * as React from 'react'
import { api } from '@/trpc/server'

import { Content } from './Content'
import Sidebar from '..'

const EMPTY = '-'

export default async function SidebarLeft() {
  const player = await api.player.info()
  const stats = await api.player.stats()
  const wearable = await api.player.wearable()

  return (
    <Sidebar $open={true} $position='left'>
      <Content
        data={[
          {
            header: 'Postava',
            items: [
              { label: 'Jméno:', value: player.name ?? '' },
              { label: 'Rasa:', value: player.race ?? '' },
              { label: 'Profese:', value: player.profession ?? '' },
            ],
          },
          { header: 'Peníze', items: [{ value: `${player.money ?? 0} zl` }] },
          {
            header: 'HP',
            items: [
              // {
              //   value: (
              //     <Progress value={info?.hp_actual} max={info?.hp_max ?? 0} color='red'>
              //       {info?.hp_actual ?? 0} / {info?.hp_max ?? 0}
              //     </Progress>
              //   ),
              // },
            ],
          },
          {
            header: 'Zbraně',
            items: [
              { label: 'Levá ruka:', value: wearable.leftHand?.name ?? EMPTY },
              { label: 'Pravá ruka:', value: wearable.rightHand?.name ?? EMPTY },
            ],
          },
          {
            header: 'Zbroj',
            items: [
              { label: 'Hlava:', value: wearable.head?.name ?? EMPTY },
              { label: 'Ramena:', value: wearable.shoulder?.name ?? EMPTY },
              { label: 'Tělo:', value: wearable.chest?.name ?? EMPTY },
              { label: 'Ruce:', value: wearable.hand?.name ?? EMPTY },
              { label: 'Kalhoty:', value: wearable.pants?.name ?? EMPTY },
              { label: 'Boty:', value: wearable.boots?.name ?? EMPTY },
            ],
          },
          {
            header: 'Staty',
            items: [
              { label: 'Level:', value: `${stats.level}` },
              {
                label: 'Poškození:',
                value: `${stats.damage_min} - ${stats.damage_max}`,
              },
              { label: 'Síla:', value: `${stats.strength}` },
              { label: 'Obratnost:', value: `${stats.agility}` },
              { label: 'Inteligence:', value: `${stats.intelligence}` },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
