'use client'

import { api } from '~/trpc/react'
import { TDirection } from '~/types/location'
import { signal, useSignalValue } from 'signals-react-safe'

import * as S from './index.styles'
import Sidebar from '../sidebar'

export default function MenuRight() {
  const { player, game } = api.useUtils()
  const { data } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.position.invalidate()
    },
  })

  const { open } = useIsSidebarRightOpen()

  function handleMoveDirection(direction: TDirection) {
    move.mutate(direction)
  }

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

module SidebarRightStore {
  const _SidebarRightSignal = {
    open: signal(true),
  }

  export function useIsSidebarRightOpen() {
    return {
      open: useSignalValue(_SidebarRightSignal.open),
    }
  }

  export function dispatchSidebarRightOpen(open: boolean) {
    _SidebarRightSignal.open.value = open
  }

  export function dispatchSidebarRightToggle() {
    _SidebarRightSignal.open.value = !_SidebarRightSignal.open.value
  }
}

export const useIsSidebarRightOpen = SidebarRightStore.useIsSidebarRightOpen
export const dispatchSidebarRightOpen = SidebarRightStore.dispatchSidebarRightOpen
export const dispatchSidebarRightToggle = SidebarRightStore.dispatchSidebarRightToggle
