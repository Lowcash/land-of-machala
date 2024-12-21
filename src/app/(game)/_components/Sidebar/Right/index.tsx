import * as S from './styles'
import Sidebar from '@/app/(game)/_components/Sidebar'
import Move from '@/app/(game)/_components/Sidebar/Right/Move'
import Quest from '@/app/(game)/_components/Sidebar/Right/Quest'
import Inventory from '@/app/(game)/_components/Sidebar/Right/Inventory'
import Position from '@/app/(game)/_components/Sidebar/Right/Position'

export default async function SidebarRight() {
  return (
    <Sidebar open={true} position='right'>
      <S.Content>
        <Move />
        <Position />
        <S.ActionContainer>
          <Quest />
          <Inventory />
        </S.ActionContainer>
      </S.Content>
    </Sidebar>
  )
}
