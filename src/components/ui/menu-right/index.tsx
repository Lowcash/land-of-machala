'use client'

import { api } from '~/trpc/react'
import { TDirection } from '~/types/location'
import { signal, useSignalValue } from 'signals-react-safe'

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

  const open = useIsSidebarRightOpen()

  function handleMoveDirection(direction: TDirection) {
    move.mutate(direction)
  }

  return (
    <Sidebar $direction='right' $open={open}>
      <div>
        <div className='flex flex-col gap-2'>
          <div>
            {/* <IconButton color='secondary' style={{ marginTop: -75 }} onClick={() => handleMoveDirection('up')}>
              <ArrowUpIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginBottom: -75 }} onClick={() => handleMoveDirection('down')}>
              <ArrowDownIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginLeft: -75 }} onClick={() => handleMoveDirection('left')}>
              <ArrowLeftIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginRight: -75 }} onClick={() => handleMoveDirection('right')}>
              <ArrowRightIcon />
            </IconButton> */}
          </div>

          <div>
            <div>x: {data?.pos_x}</div>
            <div>y: {data?.pos_y}</div>
          </div>
        </div>

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
  const SidebarLeftStore = {
    open: signal(true),
  }

  export function useIsSidebarRightOpen() {
    return useSignalValue(SidebarLeftStore.open)
  }

  export function dispatchSidebarRightOpen(open: boolean) {
    SidebarLeftStore.open.value = open
  }

  export function dispatchSidebarRightToggle() {
    SidebarLeftStore.open.value = !SidebarLeftStore.open.value
  }
}

export const useIsSidebarRightOpen = SidebarRightStore.useIsSidebarRightOpen
export const dispatchSidebarRightOpen = SidebarRightStore.dispatchSidebarRightOpen
export const dispatchSidebarRightToggle = SidebarRightStore.dispatchSidebarRightToggle
