'use client'

import { api } from '~/trpc/react'
import { dispatchSidebarLeftToggle } from '~/components/ui/menu-left'
import { dispatchSidebarRightToggle } from '~/components/ui/menu-right'
import { Button } from '../button'


export default function Action() {
  const { data } = api.game.position.useQuery()

  function toggleSidebars() {
    dispatchSidebarLeftToggle()
    dispatchSidebarRightToggle()
  }

  return (
    <>
      <button onClick={toggleSidebars} className='hidden'>
        Toggle Sidebars
      </button>

      {data?.enemy && (
        <div className='flex justify-between'>
          <Button>Útok</Button>
          <Button>Utéct</Button>
        </div>
      )}
    </>
  )
}
