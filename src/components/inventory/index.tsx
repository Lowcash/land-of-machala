'use client'

import React from 'react'
import { api } from '@/trpc/react'

import * as S from './index.styles'
import { Button } from '../ui/button'
import { H3, Link } from '@/styles/text'
import { Table } from '../table'

import { CheckIcon, ChevronLeftIcon, Cross2Icon, PaperPlaneIcon } from '@radix-ui/react-icons'

import { ROUTE, Wearable } from '@/const'

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
  const drink = api.player.drink.useMutation({
    onSettled: () => {
      player.info.invalidate()
      inventory.show.invalidate()
    },
  })

  const handleWear = React.useCallback((type: Wearable, id: string) => wear.mutate({ type, id }), [wear])
  const handleUnwear = React.useCallback((type: Wearable, id: string) => unwear.mutate({ type, id }), [unwear])
  const handleUsePotion = React.useCallback((id: string) => drink.mutate({ potionId: id }), [unwear])

  const hasWeapons = (show.data?.weapons?.length ?? 0) > 0
  const hasArmors = (show.data?.armors?.length ?? 0) > 0
  const hasPotions = (show.data?.potions?.length ?? 0) > 0

  const BackBtn = (
    <Link href={ROUTE.HOME}>
      <Button variant='default'>
        <ChevronLeftIcon />
        &nbsp; Zpět do světa
      </Button>
    </Link>
  )

  if (!hasWeapons && !hasArmors && !hasPotions)
    return (
      <S.Info>
        {BackBtn}
        <br />
        <br />
        <H3>V batohu nic nemáš</H3>
      </S.Info>
    )

  return (
    <S.Info>
      {BackBtn}
      <br />
      <br />
      <H3>V batohu se nachází:</H3>
      <br />
      <S.Inventory>
        {hasWeapons && (
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
        )}
        {hasArmors && (
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
        )}
        {hasPotions && (
          <Table
            columns={[
              {},
              { className: 'text-center', content: 'Účinnost' },
              { className: 'text-right', content: 'Použít' },
            ]}
            cells={show.data!.potions.map((x) => [
              { className: 'text-left', content: x.potion.name },
              {
                className: 'text-center',
                content: `+${x.potion.hp_gain} HP`,
              },
              {
                className: 'text-right',
                content: (
                  <Button variant='secondary' onClick={() => handleUsePotion(x.id)}>
                    <PaperPlaneIcon />
                  </Button>
                ),
              },
            ])}
          />
        )}
      </S.Inventory>
    </S.Info>
  )
}
