'use client'

import { api } from '~/trpc/react'
import { signal, useSignalValue } from 'signals-react-safe'
import { isString } from '~/utils/typeguard'

import * as S from './index.styles'
import Link from 'next/link'
import Sidebar from '../sidebar'
import Progress from '../progress'

const EMPTY = 'Žádné'

export default function MenuLeft() {
  const { data } = api.player.info.useQuery()

  const { open } = useIsSidebarLeftOpen()

  const progresses = [
    {
      label: 'HP:',
      value: (
        <Progress value={data?.hp_actual} max={data?.hp_max} color='red'>
          {data?.hp_actual ?? 0} / {data?.hp_max ?? 0}
        </Progress>
      ),
    },
  ]

  if (!!data?.mana_max) {
    progresses.push({
      label: 'Mana:',
      value: (
        <Progress value={data?.mana_actual} max={data?.mana_max}>
          {data?.mana_actual ?? 0} / {data?.mana_max ?? 0}
        </Progress>
      ),
    })
  }

  return (
    <Sidebar direction='left' open={open}>
      {data && (
        <_Menu
          data={[
            [{ label: 'Jméno:', value: data.name ?? '' }],
            [
              { label: 'Rasa:', value: data.race ?? '' },
              { label: 'Profese:', value: data.profession ?? '' },
            ],
            progresses,
            [
              { label: 'Levá ruka:', value: EMPTY },
              { label: 'Pravá ruka:', value: EMPTY },
            ],
            [
              { label: 'Hlava:', value: EMPTY },
              { label: 'Ramena:', value: EMPTY },
              { label: 'Tělo:', value: EMPTY },
              { label: 'Ruce:', value: EMPTY },
              { label: 'Kalhoty:', value: EMPTY },
              { label: 'Boty:', value: EMPTY },
            ],
            [
              { label: 'Level:', value: data.level?.toString() ?? '' },
              {
                label: 'Poškození:',
                value: `${data.damage_min} - ${data.damage_max}`,
              },
              { label: 'Síla:', value: data.strength?.toString() ?? '' },
              { label: 'Obratnost:', value: data.agility?.toString() ?? '' },
              { label: 'Inteligence:', value: data.intelligence?.toString() ?? '' },
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

module SidebarLeftStore {
  const _SidebarLeftSignal = {
    open: signal(true),
  }

  export function useIsSidebarLeftOpen() {
    return {
      open: useSignalValue(_SidebarLeftSignal.open),
    }
  }

  export function dispatchSidebarLeftOpen(open: boolean) {
    _SidebarLeftSignal.open.value = open
  }

  export function dispatchSidebarLeftToggle() {
    _SidebarLeftSignal.open.value = !_SidebarLeftSignal.open.value
  }
}

export const useIsSidebarLeftOpen = SidebarLeftStore.useIsSidebarLeftOpen
export const dispatchSidebarLeftOpen = SidebarLeftStore.dispatchSidebarLeftOpen
export const dispatchSidebarLeftToggle = SidebarLeftStore.dispatchSidebarLeftToggle
