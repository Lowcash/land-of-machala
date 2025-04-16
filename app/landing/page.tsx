import * as S from './styles'
import Image from 'next/image'
import LoginForm from '@/app/landing/_form'

export default function Landing() {
  return (
    <S.Landing>
      <Image
        className={'ml-auto mr-auto mt-auto'}
        src={`/images/icon.png`}
        alt={'icon'}
        width={500}
        height={500}
        priority
      />

      <LoginForm />
    </S.Landing>
  )
}
