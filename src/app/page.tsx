'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { usePageContext } from '@/ctx/page-provider'
import { useLayoutContext } from '@/ctx/layout-provider'

import { Content } from '@/styles/common'
import MenuLeft from '@/components/menu-left'
import MenuRight from '@/components/menu-right'
import * as S from './styles'
import Info from '@/components/info'
import Action from '@/components/action'
import XP from '@/components/xp'

import Inventory from '@/components/inventory'
import Quest from '@/components/quest'
import Create from './(create)'
import Landing from './(landing)'

import User from '@/components/user'
import { Header, HeaderOptions, Footer, Main } from '@/styles/common'

export default function () {
  const { data: info, isLoading, refetch } = api.player.info.useQuery(undefined, { enabled: false,  })

  const { page, setPage } = usePageContext()
  const { setBackgroundUrl } = useLayoutContext()
  
  React.useEffect(() => {
    if (page === 'landing') setBackgroundUrl?.()
    if (page === 'game') refetch()
  }, [page, setBackgroundUrl, refetch])

  const hasCharacter = Boolean(info?.race) && Boolean(info?.profession)

  React.useEffect(() => {
    if (isLoading) return

    setPage?.(hasCharacter ? 'game' : 'create')
  }, [hasCharacter, isLoading, setPage])

  if (page === 'landing')
    return (
      <Main>
        <Landing />
      </Main>
    )

  if (isLoading) return <></>

  return (
    <>
      <Header>
        <HeaderOptions>
          <User />
        </HeaderOptions>
      </Header>

      <Main>
        {!hasCharacter && <Create />}
        {hasCharacter && (
          <>
            <MenuLeft />
            <Content>
              <S.TopContainer>
                {page === 'game' && (
                  <>
                    <Info />
                    <Action />
                  </>
                )}
                {page === 'inventory' && <Inventory />}
                {page === 'quest' && <Quest />}
              </S.TopContainer>

              <XP />
            </Content>
            <MenuRight />
          </>
        )}
      </Main>

      <Footer></Footer>
    </>
  )
}
