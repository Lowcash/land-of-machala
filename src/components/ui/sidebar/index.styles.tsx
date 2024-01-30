'use client'

import { PropsWithChildren } from 'react'
import { TDirection } from '~/types/location'
import tw from 'twin.macro'
import styled from '@emotion/styled'

const _SidebarInner = tw.div`
  flex 
  flex-col
  h-full

  px-3 
  py-4 

  overflow-y-auto
  border-r 

  border-slate-200 
  bg-white 
  dark:border-slate-700 
  dark:bg-slate-900
`

const DIRECTION_MAP: Record<TDirection, any> = {
  left: tw`left-0`,
  right: tw`right-0`,
  up: tw`top-0`,
  down: tw`hidden`,
}

const _SidebarOuter = styled('aside')<SidebarProps>`
  ${tw`
    flex-none 
    h-screen 
    w-64 

    transition-transform

    z-40
  `}

  ${({ $direction }) => DIRECTION_MAP[$direction]}
`

type SidebarProps = {
  $direction: TDirection
}

export const Sidebar = ({ children, ...sidebar }: PropsWithChildren<SidebarProps>) => (
  <_SidebarOuter aria-label='sidebar' {...sidebar}>
    <_SidebarInner>{children}</_SidebarInner>
  </_SidebarOuter>
)
