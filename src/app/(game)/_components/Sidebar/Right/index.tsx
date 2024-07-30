import * as React from 'react'

import Move from './Move'
import Inventory from './Inventory'
import { getPlayerInfo } from '@/app/actions'
import Quest from './Quest'
import { FaTasks, FaBriefcase } from 'react-icons/fa'

import Position from './Position'
import Sidebar from '..'

export default async function SidebarRight() {
  const playerInfo = await getPlayerInfo()

  return (
    <Sidebar $open={true} $position='right'>
      <div className='flex-col gap-10'>
        <Move />
        <Position initialData={playerInfo} />
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
