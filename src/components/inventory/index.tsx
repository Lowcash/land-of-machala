'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Wearable } from '@/types/location'

import * as S from './index.styles'

export default function Inventory() {
  const { player } = api.useUtils()
  const { data: inventory } = api.player.inventory.useQuery()
  const wear = api.player.wear.useMutation({
    onSettled: () => {
      player.info.invalidate()
    },
  })

  const handleWear = React.useCallback((type: Wearable, id: string) => wear.mutate({ type, id }), [wear])

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {inventory?.weapons?.map((x: any) => (
                <tr>
                  <td>{x.weapon.name}</td>
                  <td>{x.weapon.damage_from}</td>
                  <td>{x.weapon.damage_from}</td>
                  <td>
                    <button onClick={() => handleWear('weapon', x.id)}>Use</button>
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
              {inventory?.armors?.map((x: any) => (
                <tr>
                  <td>{x.armor.name}</td>
                  <td>{x.armor.type}</td>
                  <td>{x.armor.armor}</td>
                  <td>{x.armor.strength}</td>
                  <td>{x.armor.agility}</td>
                  <td>{x.armor.intelligency}</td>
                  <td>
                    <button onClick={() => handleWear('armor', x.id)}>Use</button>
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
