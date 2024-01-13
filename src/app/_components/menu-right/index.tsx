'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'
import Drawer from '../drawer'
import { IconButton } from '@mui/material'
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SettingsIcon from '@mui/icons-material/Settings'
import { Flex } from '~/styles/flex'

import { DirectionT } from '~/types/location'

export default function MenuRight() {
  const { player, game } = api.useUtils()
  const { data } = api.player.info.useQuery()
  const move = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.checkPlace.invalidate()
    },
  })

  function handleMoveDirection(direction: DirectionT) {
    move.mutate(direction)
  }

  return (
    <Drawer anchor='right' open={true} width={350}>
      <S.Menu>
        <Flex direction='column' spacing={2}>
          <S.ButtonsContainer>
            <IconButton color='secondary' style={{ marginTop: -75 }} onClick={() => handleMoveDirection('up')}>
              <ArrowUpIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginBottom: -75 }} onClick={() => handleMoveDirection('down')}>
              <ArrowDownIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginLeft: -75 }} onClick={() => handleMoveDirection('left')}>
              <ArrowLeftIcon />
            </IconButton>
            <IconButton color='secondary' style={{ marginRight: -75 }} onClick={() => handleMoveDirection('right')}>
              <ArrowRightIcon />
            </IconButton>
          </S.ButtonsContainer>

          <S.PositionsContainer>
            <S.Text>x: {data?.pos_x}</S.Text>
            <S.Text>y: {data?.pos_y}</S.Text>
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
