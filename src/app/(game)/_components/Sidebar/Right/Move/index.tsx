import { getServerPage } from '@/lib/utls-server'

import * as S from './styles'
import Button from '@/app/(game)/_components/Sidebar/Right/Move/Button'

export default async function Move() {
  const page = await getServerPage()
  const disabled = page !== 'WORLD'

  return (
    <S.Move>
      <Button direction='up' className='-mt-28' disabled={disabled} />
      <Button direction='down' className='-mb-28' disabled={disabled} />
      <Button direction='left' className='-ml-28' disabled={disabled} />
      <Button direction='right' className='-mr-28' disabled={disabled} />
    </S.Move>
  )
}
