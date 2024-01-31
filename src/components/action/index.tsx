'use client'

import { api } from '~/trpc/react'
import { dispatchSidebarLeftToggle } from '~/components/menu-left'
import { dispatchSidebarRightToggle } from '~/components/menu-right'

import { Button as ComponentButton } from '~/components/button/component'
import { Button as ShadcnButton } from '~/components/button/shadcn'
import { Button } from '../button/shadcn'

export default function Action() {
  const { data } = api.game.position.useQuery()

  function toggleSidebars() {
    dispatchSidebarLeftToggle()
    dispatchSidebarRightToggle()
  }

  return (
    <>
      <ShadcnButton variant='destructive'>ShadcnButton</ShadcnButton>
      <ComponentButton variant='primary'>Button</ComponentButton>
      <button className='text-gray-300 bg-slate-800 p-5' onClick={toggleSidebars}>
        RegularButton - Toggle Sidebars
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
