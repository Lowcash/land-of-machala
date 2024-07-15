import styled from '@emotion/styled/macro'
import tw from 'twin.macro'

export const H2 = tw.h2`
  text-2xl font-bold
`

export const H3 = tw.h3`
  text-xl font-bold
`

interface TextProps {
  light?: boolean
}

export const Text = styled('span', {
  shouldForwardProp: (p) => p !== 'light',
})<TextProps>`
  ${tw`font-bold`}

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
