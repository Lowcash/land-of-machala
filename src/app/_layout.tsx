'use client'
import useAppHeight from '~/hook/useAppHeight'

import Menu from './_components/menu'
import { Main } from '~/styles/common'
import Menu2 from './_components/menu2'

export default function _Layout({ children }: { children: React.ReactNode }) {
  // useAppHeight()

  return (
    <>
      <header></header>
      <Main>
        <Menu />
        {children}
        <Menu2 />
      </Main>
      <footer></footer>
    </>
  )
}
