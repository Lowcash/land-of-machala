import styled from '@emotion/styled/macro'
import tw from 'twin.macro'

import { Label } from '@radix-ui/react-label'

export const H2 = tw.h2`
  text-2xl font-bold
`

export const H3 = tw.h3`
  text-xl font-bold
`

type TextProps = {
  bold?: boolean
  light?: boolean
}

export const Text = styled(Label, {
  shouldForwardProp: (p) => p !== 'light' && p !== 'bold',
})<TextProps>`
  ${({ bold }) => !!bold && tw`font-bold`}
  ${({ light }) => !!light && tw`text-gray-500`}
`

export const Link = styled(Text)`
  ${tw`
    cursor-pointer
  `}

  &:hover {
    ${tw`
      text-gray-600
    `}
  }
`.withComponent('a')
