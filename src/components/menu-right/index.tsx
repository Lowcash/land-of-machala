'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { usePageContext } from '@/ctx/page-provider'
import { Direction } from '@/const'
import { signal, useSignalValue } from 'signals-react-safe'

import * as S from './index.styles'
import { Sidebar } from '../sidebar'

export default function MenuRight() {
  const { page, setPage } = usePageContext()

  const { player, game } = api.useUtils()
  const { data: info } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  const { open } = useSidebar()

  const handleQuestClick = React.useCallback(() => setPage?.(page === 'quest' ? 'game' : 'quest'), [page, setPage])
  const handleInventoryClick = React.useCallback(
    () => setPage?.(page === 'inventory' ? 'game' : 'inventory'),
    [page, setPage],
  )

  const handleMoveDirection = React.useCallback((direction: Direction) => move.mutate(direction), [move])

  const hasCombat = Boolean(info?.enemy_instance)
  const hasLoot = Boolean(info?.loot)
  const hasInventory = page === 'inventory'
  const hasQuest = page === 'quest'

  const disableMove = hasCombat || hasLoot || hasInventory || hasQuest || !info?.canMove
  const disableInventory = hasCombat || hasLoot || !info?.canMove

  return (
    <Sidebar position='right' open={open}>
      <S.Content>
        <S.MoveWrap>
          <S.Up onClick={() => handleMoveDirection('up')} disabled={disableMove} />
          <S.Down onClick={() => handleMoveDirection('down')} disabled={disableMove} />
          <S.Left onClick={() => handleMoveDirection('left')} disabled={disableMove} />
          <S.Right onClick={() => handleMoveDirection('right')} disabled={disableMove} />
        </S.MoveWrap>

        <S.Container>
          <S.Text light>x: {info?.pos_x}</S.Text>
          <S.Text light>y: {info?.pos_y}</S.Text>
        </S.Container>

        <S.Container>
          <S.Quest onClick={handleQuestClick} />
          <S.Inventory onClick={handleInventoryClick} disabled={disableInventory} />
        </S.Container>
      </S.Content>
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
