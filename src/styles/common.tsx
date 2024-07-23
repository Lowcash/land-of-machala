'use client'

import React from 'react'
import styled from '@emotion/styled/macro'
import tw from 'twin.macro'
import { motion } from 'framer-motion'
import { useSidebar as useLeftSidebar } from '@/components/menu-left'
import { useSidebar as useRightSidebar } from '@/components/menu-right'

export const Page = ({ children }: React.PropsWithChildren) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {children}
  </motion.div>
)

export const Main = tw.main`
  flex flex-1
  justify-center items-center
`

export const Header = styled('header')`
  height: 36px;
  background: var(--gold3);

  ${tw`w-screen z-40`}
`

export const HeaderOptions = styled('div')`
  ${tw`
    w-fit gap-2
    ml-auto
  `}
`

const _FooterOuter = styled('footer')`
  height: 36px;
  background: var(--gold3);

  ${tw`w-screen z-40`}
`

const _FooterInner = styled('div')`
  ${tw`w-fit ml-auto mr-auto`}
`

export const Footer = ({ children }: React.PropsWithChildren) => (
  <_FooterOuter>
    <_FooterInner>{children}</_FooterInner>
  </_FooterOuter>
)

interface ContentProps {
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

export const Card = styled('div')`
  background: var(--gold3);
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`
