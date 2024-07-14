import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled/macro'
import { isString } from '@/utils/typeguard'

import { Text } from '@/styles/text'

const _ContentOuter = tw.div`
  flex flex-col justify-between
  h-screen
`

const _ContentInner = tw.div`
  flex flex-col justify-between
  gap-4
`

interface ContentProps {
  append?: React.ReactNode
}

export const Content = ({ children, append }: React.PropsWithChildren<ContentProps>) => (
  <_ContentOuter>
    <_ContentInner>{children}</_ContentInner>
    {append}
  </_ContentOuter>
)

interface ItemProps {
  label?: string
  value?: string | JSX.Element
}

const _Item = styled('div')`
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

  ${tw`
    inline-flex justify-between
    w-full
    gap-1
  `}
`

Content.Item = function (p: ItemProps) {
  return (
    <_Item>
      <Text light>{p.label}</Text>
      {isString(p.value) ? <Text light>{p.value}</Text> : p.value}
    </_Item>
  )
}
