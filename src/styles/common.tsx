'use client'

import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { useIsSidebarLeftOpen } from '~/components/menu-left'
import { useIsSidebarRightOpen } from '~/components/menu-right'

export const Main = tw.main`
  h-screen w-screen
  bg-white dark:bg-slate-900
`

type ContentProps = {
  isLeftSidebarOpened?: boolean
  isRightSidebarOpened?: boolean
}

const _Content = styled.section<ContentProps>`
  ${tw`
    fixed
    h-screen
    p-5
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
  const { open: isLeftSidebarOpened } = useIsSidebarLeftOpen()
  const { open: isRightSidebarOpened } = useIsSidebarRightOpen()

  return (
    <_Content isLeftSidebarOpened={isLeftSidebarOpened} isRightSidebarOpened={isRightSidebarOpened}>
      {children}
    </_Content>
  )
}
