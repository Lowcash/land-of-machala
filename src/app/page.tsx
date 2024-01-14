import * as S from './styles'
import Action from './_components/action'
import Info from './_components/info'
import XP from './_components/xp'

export default function Page() {
  return (
    <S.Page>
      <S.TopContainer>
        <Info />
        <Action />
      </S.TopContainer>

      <XP />
    </S.Page>
  )
}
