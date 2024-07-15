import * as S from './index.styles'

type Cell = { className?: string; content?: React.ReactNode }

type Props = {
  columns?: Cell[]
  cells?: Cell[][]
}

export function Table(p: Props) {
  return (
    <S.Table>
      <thead>
        <tr key={`TableHeadRow_${0}`}>
          {p.columns?.map((cell, idx) => (
            <th key={`TableHeadCell_${idx}`} className={cell.className}>
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {p.cells?.map((row, rowIdx) => (
          <tr key={`TableBodyRow_${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <td key={`TableBodyCell_${rowIdx}_${cellIdx}`} className={cell.className}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </S.Table>
  )
}
