'use client'

import { useTranslations } from 'next-intl'

import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'

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
    <Card.Content
      gap="md"
      display="flex"
      direction="col"
      flex={variant === 'flat' ? 'none' : '1'}
      minHeight="zero"
    >
      <Stack display="grid" cols="3" gap="xs" md={{ gap: 'sm' }} flex="none">
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
      <VStack fullWidth height="auto" md={{ height: 'creation', minHeight: 'none' }}>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" padding="md" md={{ display: 'none' }}>
          {content}
        </Card>

        {/* Desktop: Primary card view */}
        <Card
          variant="primary"
          padding="md"
          display="none"
          md={{ display: 'flex' }}
          direction="col"
          height="creation"
          minHeight="zero"
        >
          <Card.Header align="center" justify="center">
            <Card.Title align="center">{title}</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </VStack>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <Card
      variant={isFlat ? 'ghost' : 'primary'}
      p="md"
      direction="col"
      height={isFlat ? 'auto' : 'creation'}
      minHeight={isFlat ? 'none' : 'zero'}
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
