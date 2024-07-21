'use client'

import React from 'react'
import * as S from './styles'
import Info from '@/components/info'
import Action from '@/components/action'
import XP from '@/components/xp'

import Landing from './(landing)'
import Game from './(game)'
import User from '@/components/user'
import { Header, HeaderOptions, Footer, Main } from '@/styles/common'
import { useLayoutContext } from '@/ctx/layout-provider'
import { usePageContext } from '@/ctx/page-provider'

export default function () {
  const { setBackgroundUrl } = useLayoutContext()
  const { page } = usePageContext()

  React.useEffect(() => {
    setBackgroundUrl?.(page === 'landing' ? undefined : '/images/environment/forest.webp')
  }, [page, setBackgroundUrl])

  if (page === 'landing')
    return (
      <Main>
        <Landing />
      </Main>
    )

  return (
    <>
      <Header>
        <HeaderOptions>
          <User />
        </HeaderOptions>
      </Header>

      <Main>
        <Game>
          <S.TopContainer>
            <Info />
            <Action />
          </S.TopContainer>

          <XP />
        </Game>
      </Main>

      <Footer>
        <div className='w-fit ml-auto mr-auto'></div>
      </Footer>
    </>
  )
}
