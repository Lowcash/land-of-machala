import * as S from './styles'

type Cell = { className?: string; content?: React.ReactNode }

interface Props {
  columns?: Cell[]
  cells?: Cell[][]

  hideHeader?: boolean
}

export default function Table({ hideHeader = false, ...p }: Props) {
  return (
    <S.Table>
      {!hideHeader && (
        <S.Table.HeaderSection>
          <S.Table.Row key={`TableHeaderRow_${0}`}>
            {p.columns?.map((cell, idx) => (
              <S.Table.HeaderCell key={`TableHeaderCell_${idx}`} className={cell.className}>
                {cell.content}
              </S.Table.HeaderCell>
            ))}
          </S.Table.Row>
        </S.Table.HeaderSection>
      )}
      <S.Table.BodySection>
        {p.cells?.map((row, rowIdx) => (
          <S.Table.Row key={`TableBodyRow_${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <S.Table.BodyCell key={`TableBodyCell_${rowIdx}_${cellIdx}`} className={cell.className}>
                {cell.content}
              </S.Table.BodyCell>
            ))}
          </S.Table.Row>
        ))}
      </S.Table.BodySection>
    </S.Table>
  )
}
