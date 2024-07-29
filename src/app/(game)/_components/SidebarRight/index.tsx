import * as React from 'react'
import { api } from '@/trpc/server'

import Move from './Move'
import Inventory from './Inventory'
import Quest from './Quest'
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaTasks, FaBriefcase } from 'react-icons/fa'

export default async function SidebarRight() {
  const player = await api.player.info()

  return (
    <div>
      <div className='flex-col gap-10'>
        <div className='relative h-40'>
          {/* <div className='relative h-40 [&>*]:absolute'> */}
          <Move direction='up'>
            <FaChevronUp />
          </Move>
          <Move direction='down'>
            <FaChevronDown />
          </Move>
          <Move direction='left'>
            <FaChevronLeft />
          </Move>
          <Move direction='right'>
            <FaChevronRight />
          </Move>
        </div>
        <div className='flex w-full items-center justify-center gap-2'>
          <Quest>
            <FaTasks />
          </Quest>
          <Inventory>
            <FaBriefcase />
          </Inventory>
        </div>
      </div>
    </div>
  )
}
