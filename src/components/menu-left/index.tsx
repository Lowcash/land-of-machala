'use client'

import { api } from '@/trpc/react'
import { signal, useSignalValue } from 'signals-react-safe'

import Progress from '../progress'
import { Sidebar } from '@/components/sidebar'
import { Content } from './content'

const EMPTY = '-'

export default function MenuLeft() {
  const { data: info } = api.player.info.useQuery()
  const { data: stats } = api.player.stats.useQuery()
  const { data: wearable } = api.player.wearable.useQuery()

  const { open } = useSidebar()

  // const progresses = [
  //   {
  //     label: 'HP:',
  //     value: (
  //       <Progress value={info?.hp_actual} max={info?.hp_max ?? 0} color='red'>
  //         {info?.hp_actual ?? 0} / {info?.hp_max ?? 0}
  //       </Progress>
  //     ),
  //   },
  // ]

  // if (!!info?.mana_max) {
  //   progresses.push({
  //     label: 'Mana:',
  //     value: (
  //       <Progress value={info?.mana_actual} max={info?.mana_max}>
  //         {info?.mana_actual ?? 0} / {info?.mana_max ?? 0}
  //       </Progress>
  //     ),
  //   })
  // }

  return (
    <Sidebar position='left' open={open}>
      {info && (
        <Content
          data={[
            {
              header: 'Postava',
              items: [
                { label: 'Jméno:', value: info.name ?? '' },
                { label: 'Rasa:', value: info.race ?? '' },
                { label: 'Profese:', value: info.profession ?? '' },
              ],
            },
            { header: 'Peníze', items: [{ value: `${info.money ?? 0} zl` }] },
            {
              header: 'HP',
              items: [
                {
                  value: (
                    <Progress value={info?.hp_actual} max={info?.hp_max ?? 0} color='red'>
                      {info?.hp_actual ?? 0} / {info?.hp_max ?? 0}
                    </Progress>
                  ),
                },
              ],
            },
            {
              header: 'Zbraně',
              items: [
                { label: 'Levá ruka:', value: wearable?.leftHand?.name ?? EMPTY },
                { label: 'Pravá ruka:', value: wearable?.rightHand?.name ?? EMPTY },
              ],
            },
            {
              header: 'Zbroj',
              items: [
                { label: 'Hlava:', value: wearable?.head?.name ?? EMPTY },
                { label: 'Ramena:', value: wearable?.shoulder?.name ?? EMPTY },
                { label: 'Tělo:', value: wearable?.chest?.name ?? EMPTY },
                { label: 'Ruce:', value: wearable?.hand?.name ?? EMPTY },
                { label: 'Kalhoty:', value: wearable?.pants?.name ?? EMPTY },
                { label: 'Boty:', value: wearable?.boots?.name ?? EMPTY },
              ],
            },
            {
              header: 'Staty',
              items: [
                { label: 'Level:', value: `${stats?.level ?? 0}` },
                {
                  label: 'Poškození:',
                  value: `${stats?.damage_min} - ${stats?.damage_max}`,
                },
                { label: 'Síla:', value: `${stats?.strength ?? 0}` },
                { label: 'Obratnost:', value: `${stats?.agility ?? 0}` },
                { label: 'Inteligence:', value: `${stats?.intelligence ?? 0}` },
              ],
            },
          ]}
        />
      )}
    </Sidebar>
  )
}

type SidebarArgs = { open: boolean }

const _SidebarSignal = signal<SidebarArgs>({ open: true })

export function useSidebar() {
  return useSignalValue(_SidebarSignal)
}

export function dispatchSidebarOpen(args: SidebarArgs) {
  _SidebarSignal.value = args
}

export function dispatchSidebarToggle() {
  _SidebarSignal.value = { open: !_SidebarSignal.value.open }
}
