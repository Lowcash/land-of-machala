'use client'

import { ComponentProps, PropsWithChildren } from 'react'
import * as S from './index.styles'

type Props = ComponentProps<typeof S.Sidebar>

export default function Sidebar({ children, ...style }: PropsWithChildren<Props>) {
  return <S.Sidebar {...style}>{children}</S.Sidebar>
}
