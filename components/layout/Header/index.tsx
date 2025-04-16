import * as S from '@/components/layout/Header/styles'
import SignOut from '@/components/SignOut'

export default function Header() {
  return (
    <S.OuterWrap>
      <S.InnerWrap>
        <SignOut />
      </S.InnerWrap>
    </S.OuterWrap>
  )
}
