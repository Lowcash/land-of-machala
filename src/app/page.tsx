import * as S from './styles'
import Info from '~/components/info'
import Action from '~/components/action'

export default async function () {
  return (
    <div>
      <S.TopContainer>
        <Info />
        <Action />
      </S.TopContainer>
    </div>
  )
}
