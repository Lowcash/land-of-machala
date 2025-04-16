import * as S from './styles'
import Sidebar from '@/components/layout/Sidebar'
import Move from '@/components/layout/Sidebar/Right/Move'
import Quest from '@/components/layout/Sidebar/Right/Quest'
import Inventory from '@/components/layout/Sidebar/Right/Inventory'
import Position from '@/components/layout/Sidebar/Right/Position'

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
