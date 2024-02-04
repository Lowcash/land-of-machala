import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'

import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export { Text } from '~/styles/text'

const _Arrow = styled('div', { label: 'arrow' })`
  ${tw`
    p-3
    font-bold 
    rounded
    cursor-pointer
    bg-blue-500 hover:bg-blue-700 text-white 
  `}
`

type ArrowProps = Pick<React.ComponentProps<typeof _Arrow>, 'onClick'>

export const ArrowUp = (p: ArrowProps) => (
  <_Arrow {...p} className='arrow-up'>
    <FaArrowUp />
  </_Arrow>
)

export const ArrowDown = (p: ArrowProps) => (
  <_Arrow {...p} className='arrow-down'>
    <FaArrowDown />
  </_Arrow>
)

export const ArrowLeft = (p: ArrowProps) => (
  <_Arrow {...p} className='arrow-left'>
    <FaArrowLeft />
  </_Arrow>
)

export const ArrowRight = (p: ArrowProps) => (
  <_Arrow {...p} className='arrow-right'>
    <FaArrowRight />
  </_Arrow>
)

export const MoveWrap = styled('div', {
  label: 'move-wrap',
})`
  ${tw`
    flex justify-center items-center
    w-full h-40
  `}

  ${tw`relative`}
  [class*=arrow] {
    ${tw`absolute`}

    &.arrow-up {
      ${tw`-mt-28`}
    }
    &.arrow-down {
      ${tw`-mb-28`}
    }
    &.arrow-left {
      ${tw`-ml-28`}
    }
    &.arrow-right {
      ${tw`-mr-28`}
    }
  }
`

export const TopSection = styled('div')`
  ${tw`
    flex flex-col 
    gap-2
  `}
`

export const CoordsWrap = tw.div`
  flex justify-center items-center
  gap-2
`
