'use client'

import * as S from '../styles'
import Quest from '@/components/quest'
import XP from '@/components/xp'

export default function () {
  return (
    <>
      <S.TopContainer>
        <Quest />
      </S.TopContainer>

      <XP />
    </>
  )
}
