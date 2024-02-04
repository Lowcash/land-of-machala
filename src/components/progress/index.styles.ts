import tw from 'twin.macro'
import styled from '@emotion/styled'

import * as ProgressPrimitive from '@radix-ui/react-progress'

type TTheme = 'red' | 'green' | 'blue' | 'gold'

const THEME_MAP: Record<TTheme, any> = {
  red: tw`bg-[var(--red)]`,
  green: tw`bg-[var(--green)]`,
  blue: tw`bg-[var(--blue)]`,
  gold: tw`bg-[var(--gold)]`,
}

export type ProgressProps = {
  color?: TTheme
}

export const ProgressRoot = styled(ProgressPrimitive.Root, {
  shouldForwardProp: (p) => p !== 'color',
})<ProgressProps>`
  ${tw`
    w-full h-full
    relative
    overflow-hidden 
    rounded-full
  `}

  ${({ color }) => THEME_MAP[color ?? 'blue']}

  .text {
    ${tw`
      absolute
      top-0
      left-1/2
      -translate-x-1/2
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
