import tw from 'tailwind-styled-components'

import { Label } from '@/components/ui/label'

export const H2 = tw.h2`text-2xl font-bold`
export const H3 = tw.h3`text-xl font-bold`

interface TextProps {
  $bold?: boolean
  $light?: boolean
}

export const Text = tw(Label)<TextProps>`
  ${(p) => !!p.$bold && `font-bold`}
  ${(p) => !!p.$light && `text-gray-500`}
`

const _Link = tw(Text)`
  cursor-pointer
  hover:text-gray-600
`

export const Link = (p: React.ComponentProps<typeof _Link>) => <_Link $as={'a'} {...p} />

export const Input = tw('input')`
  max-w-28 pl-2
  border-2 rounded-md

  bg-transparent
`
