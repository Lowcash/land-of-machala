import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

import { Button } from '../ui/button'
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaTasks } from 'react-icons/fa'

export { Text } from '@/styles/text'

const _IconTWStyle = 'h-4 w-4'

type _ButtonProps = Pick<React.ComponentProps<typeof Button>, 'onClick' | 'disabled'>

export const ArrowUp = (p: _ButtonProps) => (
  <Button {...p} className='arrow-up' variant='warning' size='iconLg'>
    <FaChevronUp className={_IconTWStyle} />
  </Button>
)

export const ArrowDown = (p: _ButtonProps) => (
  <Button {...p} className='arrow-down' variant='warning' size='iconLg'>
    <FaChevronDown className={_IconTWStyle} />
  </Button>
)

export const ArrowLeft = (p: _ButtonProps) => (
  <Button {...p} className='arrow-left' variant='warning' size='iconLg'>
    <FaChevronLeft className={_IconTWStyle} />
  </Button>
)

export const ArrowRight = (p: _ButtonProps) => (
  <Button {...p} className='arrow-right' variant='warning' size='iconLg'>
    <FaChevronRight className={_IconTWStyle} />
  </Button>
)

export const Inventory = (p: _ButtonProps) => (
  <Button {...p} className='settings-tasks' variant='secondary' size='iconLg'>
    <FaTasks className={_IconTWStyle} />
  </Button>
)

export const MoveWrap = styled('div')`
  ${tw`
    flex justify-center items-center
    w-full h-40

    relative [&>*]:absolute
  `}

  .arrow-up {
    ${tw`-mt-28`}
  }
  .arrow-down {
    ${tw`-mb-28`}
  }
  .arrow-left {
    ${tw`-ml-28`}
  }
  .arrow-right {
    ${tw`-mr-28`}
  }
`

export const TopSection = tw.div`
  flex flex-col 
  gap-2
`

export const CoordsWrap = tw.div`
  flex justify-center items-center
  gap-2
`
