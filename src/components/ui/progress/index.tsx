import { clamp } from '@/lib/utils'

import * as S from './styles'

const MIN_PERCENT = 0
const MAX_PERCENT = 100

interface Props extends S.IndicatorProps {
  value: number
  max: number
}

export default function Progress(p: React.PropsWithChildren<Props>) {
  const valueInRange = clamp(p.value, MIN_PERCENT, MAX_PERCENT)
  const maxInRange = clamp(p.max, MIN_PERCENT, MAX_PERCENT)

  const indicatorValue = MAX_PERCENT - (valueInRange / maxInRange) * MAX_PERCENT

  return (
    <S.ProgressRoot {...p} value={valueInRange} max={maxInRange}>
      <S.ProgressIndicator variant={p.variant} style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {p.children && <S.ProgressText>{p.children}</S.ProgressText>}
    </S.ProgressRoot>
  )
}
