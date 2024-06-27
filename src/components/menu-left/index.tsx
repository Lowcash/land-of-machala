'use client'

import { api } from '@/trpc/react'
import { signal, useSignalValue } from 'signals-react-safe'
import { isString } from '@/utils/typeguard'

import * as S from './index.styles'
import Link from 'next/link'
import Sidebar from '../sidebar'
import Progress from '../progress'

const EMPTY = 'Žádné'

export default function MenuLeft() {
  const { data: info } = api.player.info.useQuery()
  const { data: stats } = api.player.stats.useQuery()
  const { data: wearable } = api.player.wearable.useQuery()

  const { open } = useSidebar()

  const progresses = [
    {
      label: 'HP:',
      value: (
        <Progress value={info?.hp_actual} max={info?.hp_max} color='red'>
          {info?.hp_actual ?? 0} / {info?.hp_max ?? 0}
        </Progress>
      ),
    },
  ]

  if (!!info?.mana_max) {
    progresses.push({
      label: 'Mana:',
      value: (
        <Progress value={info?.mana_actual} max={info?.mana_max}>
          {info?.mana_actual ?? 0} / {info?.mana_max ?? 0}
        </Progress>
      ),
    })
  }

  return (
    <Sidebar direction='left' open={open}>
      {info && (
        <_Menu
          data={[
            [{ label: 'Jméno:', value: info.name ?? '' }],
            [
              { label: 'Rasa:', value: info.race ?? '' },
              { label: 'Profese:', value: info.profession ?? '' },
            ],
            progresses,
            [
              { label: 'Levá ruka:', value: wearable?.leftHand?.name ?? EMPTY },
              { label: 'Pravá ruka:', value: wearable?.rightHand?.name ?? EMPTY },
            ],
            [
              { label: 'Hlava:', value: wearable?.head?.name ?? EMPTY },
              { label: 'Ramena:', value: wearable?.shoulder?.name ?? EMPTY },
              { label: 'Tělo:', value: wearable?.chest?.name ?? EMPTY },
              { label: 'Ruce:', value: wearable?.hand?.name ?? EMPTY },
              { label: 'Kalhoty:', value: wearable?.pants?.name ?? EMPTY },
              { label: 'Boty:', value: wearable?.boots?.name ?? EMPTY },
            ],
            [
              { label: 'Level:', value: stats?.level?.toString() ?? '' },
              {
                label: 'Poškození:',
                value: `${stats?.damage_min} - ${stats?.damage_max}`,
              },
              { label: 'Síla:', value: stats?.strength?.toString() ?? '' },
              { label: 'Obratnost:', value: stats?.agility?.toString() ?? '' },
              { label: 'Inteligence:', value: stats?.intelligence?.toString() ?? '' },
            ],
          ]}
        />
      )}
    </Sidebar>
  )
}

type _Props = {
  data: Array<ItemProps[]>
}

function _Menu({ data }: _Props) {
  return (
    <S.Menu
      append={
        <Link
          href={'/api/auth/signout'}
          className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
        >
          {'Sign out'}
        </Link>
      }
    >
      {data.map((section, sectionIdx) => (
        <S.Section key={`MenuSection_${sectionIdx}`}>
          {section.map((item, itemIdx) => (
            <Item key={`MenuItem_${itemIdx}`} {...item} />
          ))}
        </S.Section>
      ))}
    </S.Menu>
  )
}

type ItemProps = {
  label: string
  value?: string | JSX.Element
}

function Item({ label, value }: ItemProps) {
  return (
    <S.Item>
      <S.Text light>{label}</S.Text>
      {isString(value) ? <S.Text light>{value}</S.Text> : value}
    </S.Item>
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
