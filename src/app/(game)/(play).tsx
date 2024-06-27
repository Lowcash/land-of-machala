import React from 'react'

import { Content } from '@/styles/common'
import MenuLeft from '@/components/menu-left'
import MenuRight from '@/components/menu-right'

export default function ({ children }: React.PropsWithChildren) {
  return (
    <>
      <MenuLeft />
      <Content>{children}</Content>
      <MenuRight />
    </>
  )
}
