'use client'

import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { useSession } from 'next-auth/react'

import * as S from './index.styles'
import Progress from '../progress'
import Drawer from '../drawer'
import { MenuList } from '@mui/material'

const EMPTY = 'Žádné'

type RaceT = 'human' | 'dwarf' | 'gnome'
type ProfessionT = 'warrior' | 'samurai' | 'mage'

export default function MenuLeft() {
  const { data } = useInfo()

  const percHP = ((data?.actualAccount.hp.now ?? 0) / (data?.actualAccount.hp.max ?? 0)) * 100
  const percMana = ((data?.actualAccount.mana?.now ?? 0) / (data?.actualAccount.mana?.max ?? 0)) * 100

  return (
    <Drawer anchor='left' open={true} width={350}>
      {data && (
        <_Menu
          data={[
            [{ label: 'Jméno:', value: data.generalAccount.name }],
            [
              { label: 'Rasa:', value: data.generalAccount.race },
              { label: 'Profese:', value: data.generalAccount.profession },
            ],
            [
              {
                label: 'HP:',
                value: (
                  <div style={{ width: 200 }}>
                    <Progress value={percHP} theme='red'>
                      {data.actualAccount.hp.now} / {data.actualAccount.hp.max}
                    </Progress>
                  </div>
                ),
              },
              {
                label: 'Mana:',
                value: (
                  <div style={{ width: 200 }}>
                    <Progress value={percMana}>
                      {data.actualAccount.mana?.now} / {data.actualAccount.mana?.max}
                    </Progress>
                  </div>
                ),
              },
              { label: 'Peníze:', value: data.actualAccount.money.toString() },
            ],
            [
              { label: 'Levá ruka:', value: data.hands.left },
              { label: 'Pravá ruka:', value: data.hands.right },
            ],
            [{ label: 'Zbroj:' }],
            [
              { label: 'Hlava:', value: data.armor.head },
              { label: 'Ramena:', value: data.armor.arms },
              { label: 'Tělo:', value: data.armor.chest },
              { label: 'Ruce:', value: data.armor.hands },
              { label: 'Kalhoty:', value: data.armor.pants },
              { label: 'Boty:', value: data.armor.boots },
            ],
            [{ label: 'Dovednosti:' }],
            [
              { label: 'Level:', value: data.skills.level.toString() },
              {
                label: 'Poškození:',
                value: `${data.skills.damage.from} - ${data.skills.damage.to}`,
              },
              { label: 'Síla:', value: data.skills.strength.toString() },
              { label: 'Obratnost:', value: data.skills.agility.toString() },
              { label: 'Inteligence:', value: data.skills.intelligence.toString() },
            ],
          ]}
        />
      )}
    </Drawer>
  )
}

type InfoT = {
  generalAccount: {
    name: string

    race: RaceT
    profession: ProfessionT
  }

  actualAccount: {
    hp: {
      now: number
      max: number
    }
    mana?: {
      now: number
      max: number
    }
    money: number
  }

  hands: {
    left: string
    right: string
  }

  armor: {
    head: string
    arms: string
    chest: string
    hands: string
    pants: string
    boots: string
  }

  skills: {
    level: number
    damage: {
      from: number
      to: number
    }
    strength: number
    agility: number
    intelligence: number
  }
}

function useInfo() {
  const [data, setData] = useState<InfoT>()

  const { data: session } = useSession()

  useAsyncEffect(async () => {
    if (!session || !session.user.name) return

    setData({
      generalAccount: {
        name: session.user.name,
        race: 'dwarf',
        profession: 'mage',
      },
      actualAccount: {
        hp: { now: 50, max: 100 },
        mana: { now: 1, max: 1 },
        money: 10,
      },
      hands: {
        left: EMPTY,
        right: EMPTY,
      },
      armor: {
        head: EMPTY,
        arms: EMPTY,
        chest: EMPTY,
        hands: EMPTY,
        pants: EMPTY,
        boots: EMPTY,
      },
      skills: {
        level: 1,
        damage: {
          from: 10,
          to: 20,
        },
        strength: 5,
        agility: 6,
        intelligence: 11,
      },
    })
  }, [session])

  return { data }
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
