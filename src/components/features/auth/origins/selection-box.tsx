'use client'

import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Stack, VStack } from '@/components/ui/core/stack'
import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'

import { SelectionDetails } from './selection-details'
import { SelectionItem } from './selection-item'

interface SelectionBoxProps {
  title: string
  items: (TranslatedRaceInfo | TranslatedClassInfo)[]
  selectedId: string | null
  onSelect: (id: string) => void
  type: 'race' | 'class'
  variant?: 'primary' | 'flat'
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

  const isPrimary = variant === 'primary'

  const content = (
    <NarrativeCard.Content
      gap="md"
      flex={isPrimary ? '1' : 'none'}
      /** Use full height for flex stretching */
      height={isPrimary ? 'full' : undefined}
      /** Prevent flex-shrink overflow in scrollable content */
      minHeight="zero"
    >
      <Stack display="grid" cols="2" gap="sm" md={{ gap: 'md' }} flex="none">
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

      <SelectionDetails
        item={selectedItem || null}
        type={type}
        flex="1"
        statLabels={statLabels}
        uiLabels={uiLabels}
      />
    </NarrativeCard.Content>
  )

  const isFlat = variant === 'flat'

  return (
    <VStack fullHeight minHeight="zero">
      <NarrativeCard
        variant={isFlat ? 'ghost' : 'secondary'}
        direction="col"
        height={isFlat ? 'auto' : 'full'}
        minHeight={'zero'}
      >
        {!isFlat && (
          <NarrativeCard.Header align="center" justify="center">
            <NarrativeCard.Title align="center" variant="large">
              {title}
            </NarrativeCard.Title>
          </NarrativeCard.Header>
        )}

        {content}
      </NarrativeCard>
    </VStack>
  )
}
