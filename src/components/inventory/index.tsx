'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Wearable } from '@/const'

import * as S from './index.styles'
import { Button } from '../ui/button'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'

export default function Inventory() {
  const { player } = api.useUtils()
  const { data: inventory } = api.player.inventory.useQuery()
  const wear = api.player.wear.useMutation({
    onSettled: () => {
      player.wearable.invalidate()
      player.stats.invalidate()
      player.inventory.invalidate()
    },
  })
  const unwear = api.player.unwear.useMutation({
    onSettled: () => {
      player.wearable.invalidate()
      player.stats.invalidate()
      player.inventory.invalidate()
    },
  })

  const handleWear = React.useCallback((type: Wearable, id: string) => wear.mutate({ type, id }), [wear])
  const handleUnwear = React.useCallback((type: Wearable, id: string) => unwear.mutate({ type, id }), [unwear])

  const hasWeapons = (inventory?.weapons?.length ?? 0) > 0
  const hasArmors = (inventory?.armors?.length ?? 0) > 0

  if (!hasWeapons && !hasArmors)
    return (
      <S.Info>
        <b>
          <Label>V batohu nic nemáš</Label>
        </b>
      </S.Info>
    )

  return (
    <S.Info>
      <>
        <b>
          <Label>V batohu se nachází:</Label>
          <br />
          <br />
          <Label>Zbraň</Label>
          <br />
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th></th>
                <th className='text-center'>Poškození</th>
                <th className='text-center'>Obléct (levá ruka)</th>
                <th className='text-center'>Obléct (pravá ruka)</th>
              </tr>
            </thead>
            <tbody>
              {inventory?.weapons?.map((x: any, idx: number) => (
                <tr key={`InventoryWeapon_${idx}`}>
                  <td className='text-left'>{x.weapon.name}</td>
                  <td className='text-center'>
                    {x.weapon.damage_from}-{x.weapon.damage_to}
                  </td>
                  <td className='text-center'>
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
                  </td>
                  <td className='text-center'>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Label>Zbroj</Label>
          <br />
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th></th>
                <th>Typ</th>
                <th>Zbroj</th>
                <th>Síla</th>
                <th>Obratnost</th>
                <th>Inteligence</th>
                <th>Obléct</th>
              </tr>
            </thead>
            <tbody>
              {inventory?.armors?.map((x: any, idx: number) => (
                <tr key={`InventoryArmor_${idx}`}>
                  <td className='text-left'>{x.armor.name}</td>
                  <td className='text-center'>{x.armor.type}</td>
                  <td className='text-center'>{x.armor.armor}</td>
                  <td className='text-center'>{x.armor.strength}</td>
                  <td className='text-center'>{x.armor.agility}</td>
                  <td className='text-center'>{x.armor.intelligency}</td>
                  <td className='text-center'>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </b>
      </>
    </S.Info>
  )
}
