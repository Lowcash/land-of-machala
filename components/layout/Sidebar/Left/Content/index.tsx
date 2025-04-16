import * as S from './styles'
import Item from '@/components/layout/Sidebar/Left/Content/Item'

interface Props {
  data: Array<{
    header?: React.ReactNode
    items: React.ComponentProps<typeof Item>[]
  }>
}

export default function Content(p: Props) {
  return (
    <S.Content>
      {p.data.map((section, sectionIdx) => (
        <div key={`MenuContentSection_${sectionIdx}`}>
          {section.header && <S.SectionHeader>{section.header}</S.SectionHeader>}
          <S.SectionItemsWrap>
            {section.items.map((item, itemIdx) => (
              <Item
                {...item}
                key={`MenuContentItem_${itemIdx}`}
                className={itemIdx !== section.items.length - 1 ? styles.undeline : undefined}
              />
            ))}
          </S.SectionItemsWrap>
        </div>
      ))}
    </S.Content>
  )
}

const styles = {
  undeline: 'border-b border-dashed border-black/20',
}
