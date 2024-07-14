import * as S from './index.styles'
import { Sidebar } from '@/components/sidebar'

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
        <Sidebar.Section key={`MenuSection_${sectionIdx}`}>
          {section.header && <Sidebar.SectionHeader>{section.header}</Sidebar.SectionHeader>}
          <Sidebar.SectionContent>
            {section.items.map((item, itemIdx) => (
              <S.Content.Item key={`MenuItem_${itemIdx}`} {...item} />
            ))}
          </Sidebar.SectionContent>
        </Sidebar.Section>
      ))}
    </S.Content>
  )
}
