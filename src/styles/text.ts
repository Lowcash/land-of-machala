import styled from '@emotion/styled/macro'
import tw from 'twin.macro'

import { Label } from '@radix-ui/react-label'

type Props = {
  light?: boolean
}

export const Text = styled(Label)<Props>`
  ${tw`
    font-sans  text-gray-300
  `}

  ${({ light }) => light && tw`text-gray-500`}
`

export const Link = styled(Text)`
  ${tw`
    cursor-pointer
  `}

  &:hover {
    ${tw`
      text-gray-400
    `}
  }
`.withComponent('a')
