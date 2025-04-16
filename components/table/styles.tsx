import { cn } from '@/lib/utils'

const TableInner = (p: React.HTMLAttributes<HTMLTableElement>) => (
  <table {...p} className='w-full border-collapse border' />
)

const TableOuter = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='max-h-[300px] overflow-auto' />

export const Table = (p: React.PropsWithChildren) => (
  <TableOuter>
    <TableInner>{p.children}</TableInner>
  </TableOuter>
)

Table.HeaderSection = (p: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead {...p} className='sticky top-[-1px] z-10 bg-custom-gold-1' />
)
Table.BodySection = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />
Table.Row = (p: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...p} />
Table.HeaderCell = (p: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th {...p} className={cn('border border-gray-300', p.className)} />
)
Table.BodyCell = (p: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td {...p} className={cn('border border-gray-300', p.className)} />
)
