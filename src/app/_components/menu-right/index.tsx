'use client'

import * as S from './index.styles'
import Drawer from '../drawer'
import { IconButton, styled } from '@mui/material'
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Flex } from '~/styles/flex'

export default function MenuRight() {
  return (
    <Drawer anchor='right' open={true} width={350}>
      <S.Menu>
        <ButtonsContainer>
          <IconButton color='secondary'>
            <ArrowUpIcon />
          </IconButton>
          <IconButton color='secondary'>
            <ArrowDownIcon />
          </IconButton>
          <IconButton color='secondary'>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton color='secondary'>
            <ArrowRightIcon />
          </IconButton>
        </ButtonsContainer>
      </S.Menu>
    </Drawer>
  )
}

const ButtonsContainer = styled(Flex)`
  position: relative;
  /* button {
    position: absolute;
  } */
`
