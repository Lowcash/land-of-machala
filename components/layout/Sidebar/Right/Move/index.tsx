import * as CommonAction from '@/app/actions/common'

import * as S from './styles'
import Button from '@/components/layout/Sidebar/Right/Move/Button'

export default async function Move() {
  const disabled = (await CommonAction.getPage()) !== 'WORLD'

  return (
    <S.Move>
      <Button direction='up' className='-mt-28' disabled={disabled} />
      <Button direction='down' className='-mb-28' disabled={disabled} />
      <Button direction='left' className='-ml-28' disabled={disabled} />
      <Button direction='right' className='-mr-28' disabled={disabled} />
    </S.Move>
  )
}
