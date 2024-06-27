'use client'

import React from 'react'
import { BaseDirection } from '@/const'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

type SidebarProps = {
  open: boolean
  direction: BaseDirection
}

const _SidebarInner = styled('div')(
  tw`
    flex flex-col
    h-full
    px-3 py-4 
    overflow-y-auto
    border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900
  `
)

const DIRECTION_MAP: Record<BaseDirection, { position: any; border: any }> = {
  left: {
    position: tw`left-0`,
    border: tw`border-r`,
  },
  right: {
    position: tw`right-0`,
    border: tw`border-l`,
  },
}

const _SidebarOuter = styled('aside', {
  shouldForwardProp: (p) => p !== 'open' && p !== 'direction',
})<SidebarProps>`
  height: calc(100vh - 72px);
  top: 36px;
  
  ${tw`
    fixed

    transition-transform
    z-40
  `}

  ${({ open }) => (open ? tw`w-64` : tw`hidden`)}
  ${({ direction }) => DIRECTION_MAP[direction].position}

  > ${_SidebarInner} {
    ${({ direction }) => DIRECTION_MAP[direction].border}
  }
`

export const Sidebar = ({ children, ...sidebar }: React.PropsWithChildren<SidebarProps>) => (
  <_SidebarOuter {...sidebar}>
    <_SidebarInner>{children}</_SidebarInner>
  </_SidebarOuter>
)
