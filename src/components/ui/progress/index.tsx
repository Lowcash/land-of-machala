'use client'

import React from 'react'
import * as S from './index.styles'

type Props = React.ComponentPropsWithoutRef<typeof S.ProgressRoot> & React.ComponentProps<typeof S.ProgressIndicator>

export default function Progress({ className, value, max, children, $variant, ...p }: Props) {
  const indicatorValue = 100 - ((value ?? 0) / (max ?? 100)) * 100

  return (
    <S.ProgressRoot {...p}>
      <S.ProgressIndicator $variant={$variant} style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {children && <S.ProgressText>{children}</S.ProgressText>}
    </S.ProgressRoot>
  )
}
