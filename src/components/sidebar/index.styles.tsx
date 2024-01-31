'use client'

import { PropsWithChildren } from 'react'
import { TBaseDirection } from '~/types/location'
import tw from 'twin.macro'
import styled from '@emotion/styled'

type SidebarProps = {
  $open: boolean
  $direction: TBaseDirection
}

const _SidebarInner = styled.div`
  ${tw`
    flex flex-col
    h-full

    px-3 py-4 

   
    overflow-y-auto

    border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900
  `}
`

const DIRECTION_MAP: Record<TBaseDirection, { position: any; border: any }> = {
  left: {
    position: tw`left-0`,
    border: tw`border-r`,
  },
  right: {
    position: tw`right-0`,
    border: tw`border-l`,
  },
}

const _SidebarOuter = styled.aside<SidebarProps>`
  ${tw`
    fixed
    h-screen

    transition-transform

    z-40
  `}

  ${({ $open }) => ($open ? tw`w-64` : tw`hidden`)}
  ${({ $direction }) => DIRECTION_MAP[$direction].position}

  > .sidebar-inner {
    ${({ $direction }) => DIRECTION_MAP[$direction].border}
  }
`

export const Sidebar = ({ children, ...sidebar }: PropsWithChildren<SidebarProps>) => (
  <_SidebarOuter aria-label='sidebar' {...sidebar}>
    <_SidebarInner className='sidebar-inner'>{children}</_SidebarInner>
  </_SidebarOuter>
)
