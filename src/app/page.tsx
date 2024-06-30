import * as S from './styles'
import Info from '@/components/info'
import Action from '@/components/action'
import XP from '@/components/xp'

export default function () {
  return (
    <>
      <S.TopContainer>
        <Info />
        <Action />
      </S.TopContainer>

      <XP />
    </>
  )
}
