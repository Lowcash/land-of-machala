import styled from '@emotion/styled/macro'
import tw from 'twin.macro'

type Props = {
  light?: boolean
}

export const Text = styled('p')<Props>`
  ${tw`font-sans`}

  ${({ light }) => light && tw`text-gray-500`}
`
