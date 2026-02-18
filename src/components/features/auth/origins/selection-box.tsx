'use client'

import { useTranslations } from 'next-intl'

import type { ClassInfo } from '@/lib/game/data/classes'
import type { RaceInfo } from '@/lib/game/data/races'
import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'

import { SelectionDetails } from './selection-details'
import { SelectionItem } from './selection-item'

interface SelectionBoxProps {
  title: string
  items: (RaceInfo | ClassInfo)[]
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
      flex={variant === 'primary' ? '1' : 'none'}
      /** Fixed height for mobile accordion to match desktop behavior */
      height={variant === 'responsive' ? 'creation' : undefined}
      /** Prevent flex-shrink overflow in scrollable content */
      minHeight="zero"
    >
      <Stack display="grid" cols="2" gap="xs" md={{ gap: 'sm' }} flex="none">
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

      {selectedItem && <SelectionDetails item={selectedItem} type={type} flex="1" />}
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
      variant={isFlat ? 'ghost' : 'secondary'}
      p="md"
      direction="col"
      height={'creation'}
      minHeight={'zero'}
      // height={isFlat ? 'auto' : 'creation'}
      // minHeight={isFlat ? 'none' : 'zero'}
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
