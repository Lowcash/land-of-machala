import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

import Link from 'next/link'

export const Login = styled(Link)(
  tw`
    px-10 py-3

    font-semibold no-underline
    rounded-full
    transition
    bg-white/10 hover:bg-white/20
`)
