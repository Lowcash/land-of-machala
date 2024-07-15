'use client'

import * as S from '.././styles'
import Inventory from '@/components/inventory'
import XP from '@/components/xp'

export default function () {
  return (
    <>
      <S.TopContainer>
        <Inventory />
      </S.TopContainer>

      <XP />
    </>
  )
}
