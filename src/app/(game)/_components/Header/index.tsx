import * as S from '@/app/(game)/_components/Header/styles'
import User from '@/app/(game)/_components/Header/User'

export default function Header() {
  return (
    <S.OuterWrap>
      <S.InnerWrap>
        <User />
      </S.InnerWrap>
    </S.OuterWrap>
  )
}
