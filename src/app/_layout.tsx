'use client'

import { Main } from '~/styles/common'
import MenuLeft from './_components/menu-left'
import MenuRight from './_components/menu-right'

export default function _Layout({ children }: { children: React.ReactNode }) {
  // useAppHeight()

  return (
    <>
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
