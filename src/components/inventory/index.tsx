'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Wearable } from '@/const'

import * as S from './index.styles'
import { Button } from '../ui/button'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

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

  return (
    <S.Info>
      <>
        <b>
          V batohu se nachází:
          <br />
          <br />
          Zbraň
          <br />
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th></th>
                <th>Poškození</th>
                <th>Levá</th>
                <th>Pravá</th>
              </tr>
            </thead>
            <tbody>
              {inventory?.weapons?.map((x: any, idx: number) => (
                <tr key={`InventoryWeapon_${idx}`}>
                  <td>{x.weapon.name}</td>
                  <td>
                    {x.weapon.damage_from}-{x.weapon.damage_to}
                  </td>
                  <td>
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
                  <td>
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
          Zbroj
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {inventory?.armors?.map((x: any, idx: number) => (
                <tr key={`InventoryArmor_${idx}`}>
                  <td>{x.armor.name}</td>
                  <td>{x.armor.type}</td>
                  <td>{x.armor.armor}</td>
                  <td>{x.armor.strength}</td>
                  <td>{x.armor.agility}</td>
                  <td>{x.armor.intelligency}</td>
                  <td>
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
