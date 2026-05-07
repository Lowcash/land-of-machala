import clsx from 'clsx'

import { List } from '@/components/ui/core/layout'
import { TEXT_TRACKING_CLASS } from '@/components/ui/core/typography'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { SectionTitle } from '@/components/ui/prefabs/typography'

type SelectionItem = {
  bonuses: string[]
  description: string
  id: string
  name: string
}

type SelectionColumnProps = {
  items: SelectionItem[]
  selectedId: string
  title: string
  onSelect: (id: string) => void
}

const SELECTION_BUTTON_CLASS = `font-interface cursor-pointer rounded-compact border ${TEXT_TRACKING_CLASS.action} uppercase transition`

export function SelectionColumn({ items, onSelect, selectedId, title }: SelectionColumnProps) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  return (
    <OriginsCard.Panel>
      <SectionTitle
        align="left"
        description={selected.description}
        overline={title}
        title={selected.name}
      />
      <List direction="row" wrap>
        {items.map((item) => {
          const isActive = item.id === selectedId

          return (
            <List.Item key={item.id}>
              <button
                className={clsx(
                  SELECTION_BUTTON_CLASS,
                  isActive
                    ? 'border-primary bg-primary text-on-primary'
                    : 'text-on-surface-variant border-outline-variant/40 bg-surface-container/60 hover:border-primary/40 hover:text-on-surface'
                )}
                onClick={() => onSelect(item.id)}
                type="button"
              >
                {item.name}
              </button>
            </List.Item>
          )
        })}
      </List>
      <List className="text-on-surface-variant">
        {selected.bonuses.map((bonus) => (
          <List.Item key={bonus}>• {bonus}</List.Item>
        ))}
      </List>
    </OriginsCard.Panel>
  )
}
