import { isString } from '@/lib/typeguard'

interface Props {
  data: Array<{
    header?: React.ReactNode
    items: React.ComponentProps<typeof Item>[]
  }>
}

export function Content({ data }: Props) {
  return (
    <div>
      {data.map((section, sectionIdx) => (
        <div key={`MenuContentSection_${sectionIdx}`}>
          {section.header && <div className='rounded-md bg-slate-700 p-2 text-gray-900'>{section.header}</div>}
          <div className='ml-4 flex flex-col justify-center border-l-2 pl-2'>
            {section.items.map((item, itemIdx) => (
              <Item key={`MenuContentItem_${itemIdx}`} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface ItemProps {
  label?: string
  value?: string | JSX.Element
}

function Item(p: ItemProps) {
  return (
    <div className='inline-flex h-6 w-full justify-between gap-1'>
      <span>{p.label}</span>
      {isString(p.value) ? <span>{p.value}</span> : p.value}
    </div>
  )
}
