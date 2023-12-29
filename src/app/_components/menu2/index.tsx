'use client'
import { Flex } from '~/styles/flex'
import * as S from './index.styles'
import CustomizedProgressBars from '../progress'

export default function Menu2() {
  return (
    <S.Menu>
      <Flex spacing={1}>
        <label>HP: </label>
        <CustomizedProgressBars />
      </Flex>
    </S.Menu>
  )
}
