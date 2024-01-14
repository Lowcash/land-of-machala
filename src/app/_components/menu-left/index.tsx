'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'
import Progress from '../progress'
import Drawer from '../drawer'
import { MenuList } from '@mui/material'

const EMPTY = 'Žádné'

export default function MenuLeft() {
  const { data } = api.player.info.useQuery()

  const progresses = [
    {
      label: 'HP:',
      value: (
        <div style={{ width: 200 }}>
          <Progress value={((data?.hp_actual ?? 0) / (data?.hp_max ?? 0)) * 100} theme='red'>
            {data?.hp_actual ?? 0} / {data?.hp_max ?? 0}
          </Progress>
        </div>
      ),
    },
  ]

  if (!!data?.mana_max) {
    progresses.push({
      label: 'Mana:',
      value: (
        <div style={{ width: 200 }}>
          <Progress value={((data?.mana_actual ?? 0) / (data?.mana_max ?? 0)) * 100}>
            {data?.mana_actual ?? 0} / {data?.mana_max ?? 0}
          </Progress>
        </div>
      ),
    })
  }

  return (
    <Drawer anchor='left' open={true} width={350}>
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
    </Drawer>
  )
}

type _Props = {
  data: Array<ItemProps[]>
}

function _Menu({ data }: _Props) {
  return (
    <S.Menu>
      {data.map((section, sectionIdx) => (
        <MenuList key={`MenuSection_${sectionIdx}`}>
          {section.map((item, itemIdx) => (
            <Item key={`MenuItem_${itemIdx}`} {...item} />
          ))}
        </MenuList>
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
      <S.Text>{label}</S.Text>
      <S.Text>{value}</S.Text>
    </S.Item>
  )
}
