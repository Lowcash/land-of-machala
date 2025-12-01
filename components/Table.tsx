import { cn } from '@/lib/utils'

type Cell = { className?: string; content?: React.ReactNode }

interface Props {
  columns?: Cell[]
  cells?: Cell[][]

  hideHeader?: boolean
}

export default function Table({ hideHeader = false, ...p }: Props) {
  return (
    <div className='max-h-[300px] overflow-auto'>
      <table className='w-full border-collapse border'>
        {!hideHeader && (
          <thead className='sticky top-[-1px] z-10 bg-custom-gold-1'>
            <tr key={`TableHeaderRow_${0}`}>
              {p.columns?.map((cell, idx) => (
                <th key={`TableHeaderCell_${idx}`} className={cn('border border-gray-300', cell.className)}>
                  {cell.content}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {p.cells?.map((row, rowIdx) => (
            <tr key={`TableBodyRow_${rowIdx}`}>
              {row.map((cell, cellIdx) => (
                <td key={`TableBodyCell_${rowIdx}_${cellIdx}`} className={cn('border border-gray-300', cell.className)}>
                  {cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
