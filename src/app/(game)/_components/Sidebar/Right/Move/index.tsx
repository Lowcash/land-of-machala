import * as S from './styles'
import Button from '@/app/(game)/_components/Sidebar/Right/Move/Button'

export default function Move() {
  return (
    <S.Move>
      <Button direction='up' className='-mt-28' />
      <Button direction='down' className='-mb-28' />
      <Button direction='left' className='-ml-28' />
      <Button direction='right' className='-mr-28' />
    </S.Move>
  )
}
