'use client'

import React from 'react'
import styled from '@emotion/styled/macro'
import tw from 'twin.macro'
import { useSidebar as useLeftSidebar } from '@/components/menu-left'
import { useSidebar as useRightSidebar } from '@/components/menu-right'

export const Main = tw.main`
  flex flex-1
  justify-center items-center
`

export const Header = styled('header')`
  height: 36px;
  
  ${tw`
    w-screen z-50
    border-b border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-900
  `}
`

export const Footer = styled('footer')`
  height: 36px;

  ${tw`
    w-screen z-50
    border-t border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-900
  `}
`

type ContentProps = {
  isLeftSidebarOpened?: boolean
  isRightSidebarOpened?: boolean
}

const _Content = styled('section')<ContentProps>`
  height: calc(100vh - 72px);
  top: 36px;

  ${tw`
    flex flex-col justify-between
    fixed
    p-5
    overflow-auto
  `}

  ${({ isLeftSidebarOpened, isRightSidebarOpened }) => {
    if (isLeftSidebarOpened && isRightSidebarOpened) return tw`w-[calc(100vw - 32rem)]`
    if (isLeftSidebarOpened || isRightSidebarOpened) return tw`w-[calc(100vw - 16rem)]`

    return tw`w-screen`
  }}
  
  ${({ isLeftSidebarOpened }) => isLeftSidebarOpened && tw`ml-64`}
  ${({ isRightSidebarOpened }) => isRightSidebarOpened && tw`mr-64`}
`

export const Content = ({ children }: React.PropsWithChildren) => {
  const { open: isLeftSidebarOpened } = useLeftSidebar()
  const { open: isRightSidebarOpened } = useRightSidebar()

  return (
    <_Content isLeftSidebarOpened={isLeftSidebarOpened} isRightSidebarOpened={isRightSidebarOpened}>
      {children}
    </_Content>
  )
}

export const List = styled('ul')`
  ${tw`
    list-disc pl-4 
  `}
`