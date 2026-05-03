import clsx from 'clsx'

import { Box, Stack } from '@/components/ui/core/layout'
import { SectionTitle } from '@/components/ui/core/typography'

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

export function SelectionColumn({ items, onSelect, selectedId, title }: SelectionColumnProps) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  return (
    <Box border padding="md" radius="xl" tone="panel">
      <Stack gap="md">
        <SectionTitle
          align="left"
          description={selected.description}
          overline={title}
          title={selected.name}
          titleSize="lg"
        />
        <ul className="flex flex-wrap gap-(--space-stack-sm)">
          {items.map((item) => {
            const isActive = item.id === selectedId

            return (
              <li key={item.id}>
                <button
                  className={clsx(
                    'font-label cursor-pointer rounded-full border px-(--space-pad-sm) py-(--space-stack-sm) text-xs tracking-[0.16em] uppercase transition',
                    isActive
                      ? 'border-primary bg-primary text-on-primary'
                      : 'text-on-surface-variant border-outline-variant/40 bg-surface-container/60 hover:border-primary/40 hover:text-on-surface'
                  )}
                  onClick={() => onSelect(item.id)}
                  type="button"
                >
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
        <Stack as="ul" className="text-on-surface-variant text-sm" gap="sm" resetList>
          {selected.bonuses.map((bonus) => (
            <li key={bonus}>• {bonus}</li>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
