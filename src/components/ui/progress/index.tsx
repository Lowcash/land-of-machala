import * as S from './styles'

const MAX_PERCENT = 100

interface Props extends S.IndicatorProps {
  value: number
  max: number
}

export default function Progress(p: React.PropsWithChildren<Props>) {
  const indicatorValue = MAX_PERCENT - (p.value / p.max) * MAX_PERCENT

  return (
    <S.ProgressRoot {...p}>
      <S.ProgressIndicator variant={p.variant} style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {p.children && <S.ProgressText>{p.children}</S.ProgressText>}
    </S.ProgressRoot>
  )
}
