import tw from 'tailwind-styled-components'

import { Text } from '@/styles/text-server'
import * as ProgressPrimitive from '@radix-ui/react-progress'

const VARIANT = {
  red: 'bg-[var(--red)]',
  green: 'bg-[var(--green)]',
  blue: 'bg-[var(--blue)]',
  gold: 'bg-[var(--gold)]',
}

export type Variant = keyof typeof VARIANT

interface ProgressIndicatorProps {
  $variant: Variant
}

export const ProgressIndicator = tw(ProgressPrimitive.Indicator)<ProgressIndicatorProps>`
  h-full w-full flex-1 transition-all
  ${(p) => VARIANT[p.$variant]}

  [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2 [&>*]:transform
`

const _ProgressOuterText = tw(Text)`
  rounded-sm bg-white/45 px-1 shadow-sm
`

const _ProgressInnerText = tw.div`mt-[3px]`

export const ProgressText = ({ children }: React.PropsWithChildren) => (
  <_ProgressOuterText>
    <_ProgressInnerText>{children}</_ProgressInnerText>
  </_ProgressOuterText>
)

export const ProgressRoot = tw(ProgressPrimitive.Root)`
  relative h-full w-full 
  overflow-hidden rounded-full 
  border border-black/10 bg-[var(--gold2)]
`
