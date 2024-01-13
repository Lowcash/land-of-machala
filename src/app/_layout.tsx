'use client'

import { Main } from '~/styles/common'
import MenuLeft from './_components/menu-left'
import MenuRight from './_components/menu-right'
import _Init from './_components/_init'

export default function _Layout({ children }: { children: React.ReactNode }) {
  // useAppHeight()

  return (
    <>
      <_Init />

      <header></header>
      <Main>
        <MenuLeft />
        {children}
        <MenuRight />
      </Main>
      <footer></footer>
    </>
  )
}
