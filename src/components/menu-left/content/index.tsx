import * as S from './index.styles'

interface Props {
  data: Array<{
    header?: React.ReactNode
    items: React.ComponentProps<typeof S.Content.Item>[]
  }>
}

export function Content({ data }: Props) {
  return (
    <S.Content>
      {data.map((section, sectionIdx) => (
        <S.SidebarSection key={`MenuContentSection_${sectionIdx}`}>
          {section.header && <S.SidebarSectionHeader>{section.header}</S.SidebarSectionHeader>}
          <S.SidebarSectionContent>
            {section.items.map((item, itemIdx) => (
              <S.Content.Item key={`MenuContentItem_${itemIdx}`} {...item} />
            ))}
          </S.SidebarSectionContent>
        </S.SidebarSection>
      ))}
    </S.Content>
  )
}
