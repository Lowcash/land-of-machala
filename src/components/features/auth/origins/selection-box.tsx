'use client'

import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'
import { FadeIn, Presence } from '@/components/ui/prefabs/animations/motion-prefabs'

import { SelectionDetails } from './selection-details'
import { SelectionItem } from './selection-item'

interface SelectionBoxProps {
  title: string
  items: (TranslatedRaceInfo | TranslatedClassInfo)[]
  selectedId: string | null
  onSelect: (id: string) => void
  type: 'race' | 'class'
  variant?: 'primary' | 'flat' | 'responsive'
  statLabels: Record<string, string>
  uiLabels: any
}

export function SelectionBox({
  title,
  items,
  selectedId,
  onSelect,
  type,
  variant = 'primary',
  statLabels,
  uiLabels,
}: SelectionBoxProps) {
  const selectedItem = items.find((i) => i.id === selectedId)

  const isPrimaryOrResponsive = variant === 'primary' || variant === 'responsive'

  const content = (
    <Card.Content
      gap="md"
      flex={isPrimaryOrResponsive ? '1' : 'none'}
      /** Use full height for flex stretching */
      height={isPrimaryOrResponsive ? 'full' : undefined}
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
              name={item.name}
              icon={Icon}
              isSelected={isSelected}
              onClick={() => onSelect(item.id)}
            />
          )
        })}
      </Stack>

      <Presence mode="wait">
        {selectedItem && (
          <FadeIn key={selectedItem.id}>
            <VStack flex="1" minHeight="zero">
              <SelectionDetails
                item={selectedItem}
                type={type}
                flex="1"
                statLabels={statLabels}
                uiLabels={uiLabels}
              />
            </VStack>
          </FadeIn>
        )}
      </Presence>
    </Card.Content>
  )

  if (variant === 'responsive') {
    return (
      <VStack fullWidth height="selection" md={{ height: 'full' }}>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" padding="md" height="full" flex="1" md={{ p: 'lg', display: 'none' }}>
          {content}
        </Card>

        {/* Desktop: Primary card view */}
        <VStack flex="1" height="full">
          <Card
            variant="primary"
            p="md"
            md={{ p: 'lg', display: 'flex' }}
            display="none"
            direction="col"
            height="full"
            minHeight="zero"
          >
            <Card.Header align="center" justify="center">
              <Card.Title align="center">{title}</Card.Title>
            </Card.Header>
            {content}
          </Card>
        </VStack>
      </VStack>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <VStack fullHeight minHeight="zero">
      <Card
        variant={isFlat ? 'ghost' : 'secondary'}
        p="md"
        md={{ p: 'lg' }}
        direction="col"
        height={isFlat ? 'auto' : 'full'}
        minHeight={'zero'}
      >
        {!isFlat && (
          <Card.Header align="center" justify="center">
            <Card.Title align="center">{title}</Card.Title>
          </Card.Header>
        )}

        {content}
      </Card>
    </VStack>
  )
}
