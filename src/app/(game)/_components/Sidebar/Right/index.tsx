import * as React from 'react'
import tw from 'tailwind-styled-components'
import { styled } from '@linaria/react'

import { Button as MuiButton } from '@mui/material';
import Move from './Move'
import Inventory from './Inventory'
import { getPlayerInfo } from '@/app/actions'
import Quest from './Quest'
import { FaTasks, FaBriefcase } from 'react-icons/fa'

import Position from './Position'
import Sidebar from '..'
import Button from './TestButton'

export default async function SidebarRight() {
  const playerInfo = await getPlayerInfo()

  return (
    <Sidebar $open={true} $position='right'>
      <div className='flex-col gap-10'>
        <Move />
        <Position initialData={playerInfo} />
        <Button color='yellow' />
        <A variant='contained' color='error' color2={'blue'}>ABCD</A>
        <div className='flex w-full items-center justify-center gap-2'>
          <Quest>
            <FaTasks />
          </Quest>
          <Inventory className='top-9'>
            <FaBriefcase />
          </Inventory>
        </div>
      </div>
    </Sidebar>
  )
}

export const COLOR_BUTTON_COLOR_KEY = '--color'

export const ColorButton = tw.button`min-h-3 min-w-7 bg-slate-500 text-[var(--color)]`

const A = styled(MuiButton,)<{ color2?: string }>`
  ${({ color2 }) => `
    background-color: ${color2} !important;
  `}
`
