'use client'

import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getSelectionIcon } from '@/lib/game/origins/utils'

import { FeatureChoice } from '@/components/ui/prefabs/game/feature-choice'
import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'
import { FeatureGrid } from '@/components/ui/prefabs/structure/feature-grid'

import { SelectionDetails } from './selection-details'

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

  const content = (
    <NarrativeCard.Content
      gap="md"
      /** Prevent flex-shrink overflow in scrollable content */
      minHeight="zero"
    >
      <FeatureGrid variant="selection">
        {items.map((item) => {
          const Icon = getSelectionIcon(item.icon)
          const isSelected = selectedId === item.id

          return (
            <FeatureChoice
              key={item.id}
              label={item.name}
              icon={Icon}
              isSelected={isSelected}
              onClick={() => onSelect(item.id)}
            />
          )
        })}
      </FeatureGrid>

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
    <NarrativeCard
      variant={isFlat ? 'ghost' : 'secondary'}
      direction="col"
      height={isFlat ? 'creation' : 'full'} // Explicit height on mobile allows scrolling
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
  )
}
