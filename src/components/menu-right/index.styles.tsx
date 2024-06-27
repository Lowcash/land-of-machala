import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaTasks } from 'react-icons/fa'

export { Text } from '@/styles/text'

const _ButtonWrap = styled('button')`
  ${tw`
    p-3
    font-bold 
    rounded
    cursor-pointer
    
    text-white
    bg-blue-500 
  `}

  &:hover {
    ${tw`
      bg-blue-700
    `}
  }

  &:disabled {
    ${tw`
      cursor-default
      text-stone-500
      bg-gray-300
    `}
  }
`

type _ButtonProps = Pick<React.ComponentProps<typeof _ButtonWrap>, 'onClick' | 'disabled'>

export const ArrowUp = (p: _ButtonProps) => (
  <_ButtonWrap {...p} className='arrow-up'>
    <FaArrowUp />
  </_ButtonWrap>
)

export const ArrowDown = (p: _ButtonProps) => (
  <_ButtonWrap {...p} className='arrow-down'>
    <FaArrowDown />
  </_ButtonWrap>
)

export const ArrowLeft = (p: _ButtonProps) => (
  <_ButtonWrap {...p} className='arrow-left'>
    <FaArrowLeft />
  </_ButtonWrap>
)

export const ArrowRight = (p: _ButtonProps) => (
  <_ButtonWrap {...p} className='arrow-right'>
    <FaArrowRight />
  </_ButtonWrap>
)

export const Inventory = (p: _ButtonProps) => (
  <_ButtonWrap {...p} className='settings-tasks'>
    <FaTasks />
  </_ButtonWrap>
)

export const MoveWrap = styled('div')`
  ${tw`
    flex justify-center items-center
    w-full h-40

    relative [&>*]:absolute
  `}

  ${_ButtonWrap} {
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

export const TopSection = tw.div`
  flex flex-col 
  gap-2
`

export const CoordsWrap = tw.div`
  flex justify-center items-center
  gap-2
`
