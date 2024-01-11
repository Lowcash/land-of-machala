'use client'

import * as S from './index.styles'
import Drawer from '../drawer'
import { IconButton } from '@mui/material'
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SettingsIcon from '@mui/icons-material/Settings'
import { Flex } from '~/styles/flex'

const x = 5
const y = 5

export default function MenuRight() {
  return (
    <Drawer anchor='right' open={true} width={350}>
      <S.Menu>
        <Flex direction='column' spacing={2}>
          <S.ButtonsContainer>
            <IconButton color='secondary' style={{ marginTop: -75 }}>
              <ArrowUpIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginBottom: -75 }}>
              <ArrowDownIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginLeft: -75 }}>
              <ArrowLeftIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginRight: -75 }}>
              <ArrowRightIcon />
            </IconButton>
          </S.ButtonsContainer>

          <S.PositionsContainer>
            <S.Text>x: {x}</S.Text>
            <S.Text>y: {y}</S.Text>
          </S.PositionsContainer>
        </Flex>

        <S.SettingsContainer>
          <IconButton color='secondary' style={{ marginTop: -75, marginLeft: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginTop: -75, marginRight: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginBottom: -75, marginLeft: -75 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color='secondary' style={{ marginBottom: -75, marginRight: -75 }}>
            <SettingsIcon />
          </IconButton>
        </S.SettingsContainer>
      </S.Menu>
    </Drawer>
  )
}
