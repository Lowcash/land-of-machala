'use client'

import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'
import type { Direction } from '@/types'

import { H2, H3 } from '@/styles/text'

interface SidebarProps {
  open: boolean
  position: Direction
}

const _SidebarInner = styled('div')`
  ${tw`
    flex flex-col h-full px-3 py-4 
    overflow-y-auto
    rounded-lg
  `}

  background: var(--gold2);;
`

const _SidebarOuter = styled('aside', {
  shouldForwardProp: (p) => p !== 'open' && p !== 'direction',
})<SidebarProps>`
  height: calc(100vh - 72px);
  top: 36px;

  ${tw`fixed z-50`}

  ${({ open }) => (open ? tw`w-64` : tw`hidden`)}
  ${({ position }) => (
    position === 'left' 
    ? tw`left-0` 
    : position === 'right' 
    ? tw`right-0` 
    : ''
  )}

  > ${_SidebarInner} {
    ${({ position }) => (
      position === 'left'
      ? `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);` :
      position === 'right'
      ? `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5)`
      : ''
    )}
  }
`

export const Sidebar = ({ children, ...sidebar }: React.PropsWithChildren<SidebarProps>) => (
  <_SidebarOuter {...sidebar}>
    <_SidebarInner>{children}</_SidebarInner>
  </_SidebarOuter>
)

Sidebar.Header = styled(H2)`
  ${tw`mb-4`}
`

Sidebar.Section = styled('div')``
Sidebar.SectionHeader = styled(H3)`
  ${tw`text-gray-900`}
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 0.5rem;
`
Sidebar.SectionContent = styled('div')`
  ${tw`
    flex flex-col justify-center
    min-h-8 space-y-2
  `}
  margin-left: 1rem;
  padding-left: 0.5rem;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
`