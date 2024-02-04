import tw from 'twin.macro'
import styled from '@emotion/styled'

import * as ProgressPrimitive from '@radix-ui/react-progress'

type TTheme = 'red' | 'green' | 'blue' | 'gold'

const THEME_MAP: Record<TTheme, any> = {
  red: tw`bg-orange-700`,
  green: tw`bg-lime-700`,
  blue: tw`bg-blue-500`,
  gold: tw`bg-yellow-600`,
}

export type ProgressProps = {
  theme_?: TTheme
}

export const ProgressRoot = styled(ProgressPrimitive.Root)<ProgressProps>`
  ${tw`
    w-full h-full
    relative
    overflow-hidden 
    rounded-full bg-slate-50
  `}

  ${({ theme_ }) => THEME_MAP[theme_ ?? 'blue']}

  p {
    ${tw`
      text-center
    `}
  }
`

export const ProgressIndicator = styled(ProgressPrimitive.Indicator)`
  ${tw`
    h-full w-full 
    flex-1 
    bg-primary 
    transition-all
  `}
`
