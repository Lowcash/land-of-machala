import { unstable_noStore as noStore } from 'next/cache'

import * as S from './styles'
import Action from '../components/ui/action'
import Info from '../components/ui/info'
import XP from '../components/ui/xp'

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
