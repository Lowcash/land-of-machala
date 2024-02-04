'use client'

import * as S from './index.styles'

export function Login() {
  return <S.Login href={'/api/auth/signin'}>Sign in</S.Login>
}
