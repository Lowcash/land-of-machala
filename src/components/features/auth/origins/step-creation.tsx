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

        {/* Mobile: Accordion Selection (Hidden on desktop) */}
        <div className="md:hidden">
          <GameAccordion
            items={[
              {
                value: 'race',
                title: t('raceLabel'),
                content: (
                  <SelectionBox
                    title={t('raceLabel')}
                    items={RACES}
                    selectedId={selectedRaceId}
                    onSelect={onRaceSelect}
                    type="race"
                    minimal
                  />
                ),
              },
              {
                value: 'class',
                title: t('classLabel'),
                content: (
                  <SelectionBox
                    title={t('classLabel')}
                    items={CLASSES}
                    selectedId={selectedClassId}
                    onSelect={onClassSelect}
                    type="class"
                    minimal
                  />
                ),
              },
            ]}
          />
        </div>

        {/* Desktop: Race Selection (Hidden on mobile) */}
        <div className="max-md:hidden">
          <SelectionBox
            title={t('raceLabel')}
            items={RACES}
            selectedId={selectedRaceId}
            onSelect={onRaceSelect}
            type="race"
          />
        </div>

        {/* Desktop: Class Selection (Hidden on mobile) */}
        <div className="max-md:hidden">
          <SelectionBox
            title={t('classLabel')}
            items={CLASSES}
            selectedId={selectedClassId}
            onSelect={onClassSelect}
            type="class"
          />
        </div>
      </Stack>

      {/* Finish button relocated to bottom */}
      <Button variant="choice" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
        {t('finish')}
      </Button>
    </VStack>
  )
}
