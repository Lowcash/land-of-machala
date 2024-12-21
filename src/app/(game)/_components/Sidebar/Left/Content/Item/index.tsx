import { isString } from '@/lib/typeguard'

import * as S from './styles'
import { Text } from '@/styles/text-server'

interface Props {
  label?: React.ReactNode
  value?: React.ReactNode
}

export default function Item(p: PropsWithClassName<Props>) {
  return (
    <S.Item className={p.className}>
      <Text bold>{p.label}</Text>
      {isString(p.value) ? <Text>{p.value}</Text> : p.value}
    </S.Item>
  )
}
