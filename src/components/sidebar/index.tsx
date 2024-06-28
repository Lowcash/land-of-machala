'use client'

import React from 'react'
import * as S from './index.styles'

type Props = React.ComponentProps<typeof S.Sidebar>

export function Sidebar({ children, ...style }: React.PropsWithChildren<Props>) {
  return <S.Sidebar {...style}>{children}</S.Sidebar>
}
