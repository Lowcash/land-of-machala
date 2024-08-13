import { FaTasks, FaBriefcase } from 'react-icons/fa'
import Sidebar from '..'
import Move from './Move'
import Position from './Position'
import Quest from './Quest'
import Inventory from './Inventory'

export default async function SidebarRight() {
  return (
    <Sidebar $open={true} $position='right'>
      <div className='flex-col gap-10'>
        <Move />
        <Position />
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