'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { TDirection } from '@/types/location'
import { signal, useSignalValue } from 'signals-react-safe'

import * as S from './index.styles'
import Sidebar from '../sidebar'

export default function MenuRight() {
  const { player, game } = api.useUtils()
  const { data } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  const { open } = useSidebar()

  const handleMoveDirection = React.useCallback((direction: TDirection) => move.mutate(direction), [move])

  return (
    <Sidebar direction='right' open={open}>
      <div>
        <S.TopSection>
          <S.MoveWrap>
            <S.ArrowUp onClick={() => handleMoveDirection('up')} />
            <S.ArrowDown onClick={() => handleMoveDirection('down')} />
            <S.ArrowLeft onClick={() => handleMoveDirection('left')} />
            <S.ArrowRight onClick={() => handleMoveDirection('right')} />
          </S.MoveWrap>

          <S.CoordsWrap>
            <S.Text light>x: {data?.pos_x}</S.Text>
            <S.Text light>y: {data?.pos_y}</S.Text>
          </S.CoordsWrap>
        </S.TopSection>

        <div className='settings-container'>
          {/* <IconButton color='secondary' style={{ marginTop: -75, marginLeft: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginTop: -75, marginRight: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginBottom: -75, marginLeft: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginBottom: -75, marginRight: -75 }}>
            <SettingsIcon />
          </IconButton> */}
        </div>
      </div>
    </Sidebar>
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
