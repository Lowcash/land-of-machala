'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Wearable } from '@/const'

import * as S from './index.styles'
import { Button } from '../ui/button'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Text } from '@/styles/text'
import { Table } from '../table'

export default function Inventory() {
  const { player, inventory } = api.useUtils()
  const show = api.inventory.show.useQuery()
  const wear = api.player.wear.useMutation({
    onSettled: () => {
      player.wearable.invalidate()
      player.stats.invalidate()
      inventory.show.invalidate()
    },
  })
  const unwear = api.player.unwear.useMutation({
    onSettled: () => {
      player.wearable.invalidate()
      player.stats.invalidate()
      inventory.show.invalidate()
    },
  })

  const handleWear = React.useCallback((type: Wearable, id: string) => wear.mutate({ type, id }), [wear])
  const handleUnwear = React.useCallback((type: Wearable, id: string) => unwear.mutate({ type, id }), [unwear])

  const hasWeapons = (show.data?.weapons?.length ?? 0) > 0
  const hasArmors = (show.data?.armors?.length ?? 0) > 0

  if (!hasWeapons && !hasArmors)
    return (
      <S.Info>
        <b>
          <Text>V batohu nic nemáš</Text>
        </b>
      </S.Info>
    )

  return (
    <S.Info>
      <>
        <b>
          <Text>V batohu se nachází:</Text>
          <br />
          <br />
          {hasWeapons && (
            <>
              <Text>Zbraň</Text>
              <br />
              <Table
                columns={[
                  {},
                  { className: 'text-center', content: 'Poškození' },
                  { className: 'text-center', content: 'Obléct (levá ruka)' },
                  { className: 'text-center', content: 'Obléct (pravá ruka)' },
                ]}
                cells={show.data!.weapons.map((x) => [
                  { className: 'text-left', content: x.weapon.name },
                  {
                    className: 'text-center',
                    content: (
                      <>
                        {x.weapon.damage_from}-{x.weapon.damage_to}
                      </>
                    ),
                  },
                  {
                    className: 'text-center',
                    content: (
                      <>
                        {!x.armed_left && (
                          <Button variant='secondary' onClick={() => handleWear('left_weapon', x.id)}>
                            <CheckIcon />
                          </Button>
                        )}
                        {x.armed_left && (
                          <Button variant='destructive' onClick={() => handleUnwear('weapon', x.id)}>
                            <Cross2Icon />
                          </Button>
                        )}
                      </>
                    ),
                  },
                  {
                    className: 'text-center',
                    content: (
                      <>
                        {!x.armed_right && (
                          <Button variant='secondary' onClick={() => handleWear('right_weapon', x.id)}>
                            <CheckIcon />
                          </Button>
                        )}
                        {x.armed_right && (
                          <Button variant='destructive' onClick={() => handleUnwear('weapon', x.id)}>
                            <Cross2Icon />
                          </Button>
                        )}
                      </>
                    ),
                  },
                ])}
              />
            </>
          )}
          {hasArmors && (
            <>
              <Text>Zbroj</Text>
              <br />
              <Table
                columns={[
                  {},
                  {},
                  { className: 'text-center', content: 'Zbroj' },
                  { className: 'text-center', content: 'Síla' },
                  { className: 'text-center', content: 'Obratnost' },
                  { className: 'text-center', content: 'Inteligence' },
                  { className: 'text-center', content: 'Obléct' },
                ]}
                cells={show.data!.armors.map((x) => [
                  { className: 'text-left', content: x.armor.name },
                  { className: 'text-center', content: x.armor.type },
                  { className: 'text-center', content: x.armor.armor },
                  { className: 'text-center', content: x.armor.strength },
                  { className: 'text-center', content: x.armor.agility },
                  { className: 'text-center', content: x.armor.intelligency },
                  {
                    className: 'text-center',
                    content: (
                      <>
                        {!x.armed && (
                          <Button variant='secondary' onClick={() => handleWear('armor', x.id)}>
                            <CheckIcon />
                          </Button>
                        )}
                        {x.armed && (
                          <Button variant='destructive' onClick={() => handleUnwear('armor', x.id)}>
                            <Cross2Icon />
                          </Button>
                        )}
                      </>
                    ),
                  },
                ])}
              />
            </>
          )}
        </b>
      </>
    </S.Info>
  )
}
