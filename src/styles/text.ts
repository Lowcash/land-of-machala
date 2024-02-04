import styled from '@emotion/styled'
import tw from 'twin.macro'

type Props = {
  light?: boolean
}

export const Text = styled('p', { label: 'text' })<Props>`
  ${tw`font-sans`}
  
  ${({ light }) => light && tw`text-gray-500`}
`
