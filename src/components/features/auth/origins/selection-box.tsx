'use client'

import { AnimatePresence, motion } from 'framer-motion'

import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getSelectionIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'

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
              name={item.name}
              icon={Icon}
              isSelected={isSelected}
              onClick={() => onSelect(item.id)}
            />
          )
        })}
      </Stack>

      <AnimatePresence mode="wait">
        {selectedItem && (
          <motion.div
            key={selectedItem.id}
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
          >
            <SelectionDetails
              item={selectedItem}
              type={type}
              flex="1"
              statLabels={statLabels}
              uiLabels={uiLabels}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
        <motion.div layout className="flex flex-col flex-1">
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
        </motion.div>
      </VStack>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <motion.div layout className="flex flex-col h-full min-h-0">
      <Card
        variant={isFlat ? 'ghost' : 'secondary'}
        p="md"
        direction="col"
        height={'creation'}
        minHeight={'zero'}
      >
        {!isFlat && (
          <Card.Header align="center" justify="center">
            <Card.Title align="center">{title}</Card.Title>
          </Card.Header>
        )}

        {content}
      </Card>
    </motion.div>
  )
}
