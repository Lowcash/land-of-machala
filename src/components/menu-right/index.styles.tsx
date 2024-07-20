import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

import { Button } from '../ui/button'
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaTasks, FaBriefcase } from 'react-icons/fa'

export { Text } from '@/styles/text'

const _IconTWStyle = 'h-4 w-4'

type _ButtonProps = Pick<React.ComponentProps<typeof Button>, 'onClick' | 'disabled'>

export const Up = (p: _ButtonProps) => (
  <Button {...p} className='arrow-up' variant='warning' size='iconLg'>
    <FaChevronUp className={_IconTWStyle} />
  </Button>
)

export const Down = (p: _ButtonProps) => (
  <Button {...p} className='arrow-down' variant='warning' size='iconLg'>
    <FaChevronDown className={_IconTWStyle} />
  </Button>
)

export const Left = (p: _ButtonProps) => (
  <Button {...p} className='arrow-left' variant='warning' size='iconLg'>
    <FaChevronLeft className={_IconTWStyle} />
  </Button>
)

export const Right = (p: _ButtonProps) => (
  <Button {...p} className='arrow-right' variant='warning' size='iconLg'>
    <FaChevronRight className={_IconTWStyle} />
  </Button>
)

export const Inventory = (p: _ButtonProps) => (
  <Button {...p} variant='secondary' size='icon'>
    <FaBriefcase className={_IconTWStyle} />
  </Button>
)

export const Quest = (p: _ButtonProps) => (
  <Button {...p} variant='secondary' size='icon'>
    <FaTasks className={_IconTWStyle} />
  </Button>
)

export const Container = styled('div')`
  ${tw`
    flex justify-center items-center
    w-full gap-2
  `}
`

export const Content = styled(Container)`
  ${tw`flex-col gap-10`}
`

export const MoveWrap = styled(Container)`
  ${tw`
    h-40

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
