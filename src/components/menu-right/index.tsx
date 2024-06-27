'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Direction, ROUTE } from '@/const'
import { signal, useSignalValue } from 'signals-react-safe'

import * as S from './index.styles'
import Sidebar from '../sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MenuRight() {
  const pathname = usePathname()

  const { player, game } = api.useUtils()
  const { data } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  const { open } = useSidebar()

  const handleMoveDirection = React.useCallback((direction: Direction) => move.mutate(direction), [move])

  return (
    <Sidebar direction='right' open={open}>
      <div>
        <S.TopSection>
          <S.MoveWrap>
            <S.ArrowUp onClick={() => handleMoveDirection('up')} disabled={pathname === ROUTE.INVENTORY} />
            <S.ArrowDown onClick={() => handleMoveDirection('down')} disabled={pathname === ROUTE.INVENTORY} />
            <S.ArrowLeft onClick={() => handleMoveDirection('left')} disabled={pathname === ROUTE.INVENTORY} />
            <S.ArrowRight onClick={() => handleMoveDirection('right')} disabled={pathname === ROUTE.INVENTORY} />
          </S.MoveWrap>

          <S.CoordsWrap>
            <S.Text light>x: {data?.pos_x}</S.Text>
            <S.Text light>y: {data?.pos_y}</S.Text>
          </S.CoordsWrap>
        </S.TopSection>

        <S.TopSection>
          <S.MoveWrap>
            <Link href={pathname === ROUTE.INVENTORY ? ROUTE.HOME : ROUTE.INVENTORY}>
              <S.Inventory />
            </Link>
          </S.MoveWrap>
        </S.TopSection>
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
