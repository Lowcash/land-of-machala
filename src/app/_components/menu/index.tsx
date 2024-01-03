'use client'

import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import * as S from './index.styles'
import { Flex } from '~/styles/flex'
import Progress from '../progress'
import { useSession } from 'next-auth/react'

const EMPTY = 'Žádné'

type RaceT = 'human' | 'dwarf' | 'gnome'
type ProfessionT = 'warrior' | 'samurai' | 'mage'

export default function Menu() {
  const { data } = useInfo()

  if (!data) return

  return (
    <_Menu
      data={[
        [{ label: 'Jméno:', value: data.generalAccount.name }],
        [
          { label: 'Rasa:', value: data.generalAccount.race },
          { label: 'Profese:', value: data.generalAccount.profession },
        ],
        [
          { label: 'HP:', value: <Progress value={data.actualAccount.hp} theme='red' /> },
          { label: 'Mana:', value: <Progress value={data.actualAccount.mana ?? 0} /> },
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
      ]}
    />
  )
}

type InfoT = {
  generalAccount: {
    name: string

    race: RaceT
    profession: ProfessionT
  }

  actualAccount: {
    hp: number
    mana?: number
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
        hp: 50,
        mana: 25,
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
        <div key={`MenuSection_${sectionIdx}`}>
          {section.map((item, itemIdx) => (
            <Item key={`MenuItem_${itemIdx}`} {...item} />
          ))}
        </div>
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
    <Flex spacing={1}>
      <label>{label}</label>
      {value}
    </Flex>
  )
}
