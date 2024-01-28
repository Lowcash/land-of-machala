import { unstable_noStore as noStore } from 'next/cache'

import * as S from './styles'
import Action from './_components/action'
import Info from './_components/info'
import XP from './_components/xp'

export default async function Page() {
  noStore()

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
