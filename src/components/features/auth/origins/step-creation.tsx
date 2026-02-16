'use client'

import { useTranslations } from 'next-intl'

import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

import { Button } from '@/components/ui/core/button'
import { Stack, VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { PageHeader } from '@/components/ui/prefabs/typography/hero'

import { CharacterIdentity } from './character-identity'
import { SelectionBox } from './selection-box'

interface StepCreationProps {
  name: string
  onNameChange: (name: string) => void
  onRandomize: () => void
  onFinish: () => void
  selectedRaceId: string
  onRaceSelect: (id: string) => void
  selectedClassId: string
  onClassSelect: (id: string) => void
  stats: any
  canFinish: boolean
}

export function StepCreation({
  name,
  onNameChange,
  onRandomize,
  onFinish,
  selectedRaceId,
  onRaceSelect,
  selectedClassId,
  onClassSelect,
  stats,
  canFinish,
}: StepCreationProps) {
  const t = useTranslations('Auth.Origins.creation')
  const gt = useTranslations('Game')

  return (
    <VStack gap="lg" align="center" fullWidth>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Main content grid */}
      <Stack
        display="grid"
        cols="1"
        gap="md"
        fullWidth
        maxWidth="none"
        md={{ cols: '3', maxWidth: '5xl' }}
        height="creation"
      >
        {/* Column 1: Identity & Stats */}
        <CharacterIdentity
          name={name}
          onNameChange={onNameChange}
          onRandomize={onRandomize}
          stats={stats}
        />

        {/* Column 2 & 3: Mobile Accordion (Hidden on Desktop) */}
        <VStack md={{ display: 'none' }} fullWidth>
          <GameAccordion
            items={[
              {
                value: 'race',
                title: t('raceLabel'),
                selectedLabel: RACES.find((r) => r.id === selectedRaceId)
                  ? gt(`Races.${selectedRaceId}.name`)
                  : undefined,
                content: (
                  <SelectionBox
                    title={t('raceLabel')}
                    items={RACES}
                    selectedId={selectedRaceId}
                    onSelect={onRaceSelect}
                    type="race"
                    variant="responsive"
                  />
                ),
              },
              {
                value: 'class',
                title: t('classLabel'),
                selectedLabel: CLASSES.find((c) => c.id === selectedClassId)
                  ? gt(`Classes.${selectedClassId}.name`)
                  : undefined,
                content: (
                  <SelectionBox
                    title={t('classLabel')}
                    items={CLASSES}
                    selectedId={selectedClassId}
                    onSelect={onClassSelect}
                    type="class"
                    variant="responsive"
                  />
                ),
              },
            ]}
          />
        </VStack>

        {/* Column 2: Desktop Race Selection (Hidden on Mobile) */}
        <SelectionBox
          display="none"
          md={{ display: 'flex' }}
          title={t('raceLabel')}
          items={RACES}
          selectedId={selectedRaceId}
          onSelect={onRaceSelect}
          type="race"
        />

        {/* Column 3: Desktop Class Selection (Hidden on Mobile) */}
        <SelectionBox
          display="none"
          md={{ display: 'flex' }}
          title={t('classLabel')}
          items={CLASSES}
          selectedId={selectedClassId}
          onSelect={onClassSelect}
          type="class"
        />
      </Stack>

      {/* Finish button relocated to bottom */}
      <Button variant="choice" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
        {t('finish')}
      </Button>
    </VStack>
  )
}
