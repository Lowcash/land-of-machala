'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Direction } from '@/const'
import { usePathname } from 'next/navigation'
import { signal, useSignalValue } from 'signals-react-safe'

import * as S from './index.styles'
import { Sidebar } from '../sidebar'
import Link from 'next/link'

import { ROUTE } from '@/const'

export default function MenuRight() {
  const pathname = usePathname()

  const { player, game } = api.useUtils()
  const { data: info } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  const { open } = useSidebar()

  const handleMoveDirection = React.useCallback((direction: Direction) => move.mutate(direction), [move])

  const hasCombat = Boolean(info?.enemy_instance)
  const hasLoot = Boolean(info?.loot)
  const hasInventory = pathname === ROUTE.INVENTORY
  const hasQuest = pathname === ROUTE.QUEST

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
          <Link href={pathname === ROUTE.QUEST ? ROUTE.HOME : ROUTE.QUEST}>
            <S.Quest />
          </Link>
          <Link href={pathname === ROUTE.INVENTORY ? ROUTE.HOME : ROUTE.INVENTORY}>
            <S.Inventory disabled={disableInventory} />
          </Link>
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
