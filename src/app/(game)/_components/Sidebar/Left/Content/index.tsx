import { isString } from '@/lib/typeguard'

import * as S from './index.styles'

interface Props {
  data: Array<{
    header?: React.ReactNode
    items: React.ComponentProps<typeof Item>[]
  }>
}

export default function Content({ data }: Props) {
  return (
    <div>
      {data.map((section, sectionIdx) => (
        <div key={`MenuContentSection_${sectionIdx}`}>
          {section.header && <S.SectionHeader>{section.header}</S.SectionHeader>}
          <S.SectionItemsWrap>
            {section.items.map((item, itemIdx) => (
              <Item key={`MenuContentItem_${itemIdx}`} {...item} />
            ))}
          </S.SectionItemsWrap>
        </div>
      ))}
    </div>
  )
}

interface ItemProps {
  label?: React.ReactNode
  value?: React.ReactNode
}

function Item(p: ItemProps) {
  return (
    <S.ItemWrap>
      <span>{p.label}</span>
      {isString(p.value) ? <span>{p.value}</span> : p.value}
    </S.ItemWrap>
  )
}
