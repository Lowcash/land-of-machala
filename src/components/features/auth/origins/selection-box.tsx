'use client'

import { useTranslations } from 'next-intl'

import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'

import { SelectionDetails } from './selection-details'
import { SelectionItem } from './selection-item'

interface SelectionBoxProps {
  title: string
  items: any[]
  selectedId: string | null
  onSelect: (id: string) => void
  type: 'race' | 'class'
  variant?: 'primary' | 'flat' | 'responsive'
}

export function SelectionBox({
  title,
  items,
  selectedId,
  onSelect,
  type,
  variant = 'primary',
}: SelectionBoxProps) {
  const t = useTranslations('Game')
  const selectedItem = items.find((i) => i.id === selectedId)
  const translationKey = type === 'race' ? 'Races' : 'Classes'

  const content = (
    <Card.Content gap="md" display="flex" direction="col" flex={variant === 'flat' ? 'none' : '1'}>
      <Stack display="grid" cols="3" gap="xs" md={{ gap: 'sm' }}>
        {items.map((item) => {
          const Icon = getSelectionIcon(item.icon)
          const isSelected = selectedId === item.id

          return (
            <SelectionItem
              key={item.id}
              name={t(`${translationKey}.${item.id}.name`)}
              icon={Icon}
              isSelected={isSelected}
              onClick={() => onSelect(item.id)}
            />
          )
        })}
      </Stack>

      {selectedItem && <SelectionDetails item={selectedItem} type={type} />}
    </Card.Content>
  )

  if (variant === 'responsive') {
    return (
      <>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" padding="md" lg={{ display: 'none' }}>
          {content}
        </Card>

        {/* Desktop: Primary card view */}
        <Card
          variant="primary"
          padding="md"
          display="none"
          lg={{ display: 'flex' }}
          direction="col"
          height="creation"
        >
          <Card.Header align="center" justify="center">
            <Card.Title align="center">{title}</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <Card
      variant={isFlat ? 'ghost' : 'primary'}
      p="md"
      direction="col"
      height={isFlat ? 'auto' : 'creation'}
    >
      {!isFlat && (
        <Card.Header align="center" justify="center">
          <Card.Title align="center">{title}</Card.Title>
        </Card.Header>
      )}

      {content}
    </Card>
  )
}
