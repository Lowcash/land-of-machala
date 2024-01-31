'use client'

import tw from 'twin.macro'
import styled from '@emotion/styled'

import Link from 'next/link'

export function Login() {
  return <_Login href={'/api/auth/signin'}>Sign in</_Login>
}
const _Login = styled(Link)`
  ${tw`
    px-10 py-3

    font-semibold no-underline
    rounded-full
    transition
    bg-white/10 hover:bg-white/20
  `}
`
