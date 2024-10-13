import React from 'react'
import tw from 'tailwind-styled-components'

import { Card as OuterAction } from '@/styles/common-server'

const InnerAction = tw.div`flex justify-between`

export function Action({ children }: React.PropsWithChildren) {
  return (
    <OuterAction>
      <InnerAction>{children}</InnerAction>
    </OuterAction>
  )
}
