'use client'

import { useTranslations } from 'next-intl'

import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

import { Button } from '@/components/ui/core/button'
import { Stack, VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { PageHeader } from '@/components/ui/prefabs/typography/page-header'

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
    <VStack gap="lg" align="center">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Main content grid */}
      <Stack
        display="grid"
        cols="1"
        gap="md"
        fullWidth
        maxWidth="5xl"
        md={{ cols: '3' }}
        height="creation"
      >
        {/* Column 1: Identity & Stats */}
        <CharacterIdentity
          name={name}
          onNameChange={onNameChange}
          onRandomize={onRandomize}
          stats={stats}
        />

        {/* Column 2 & 3: Race & Class wrapped in Accordion for Mobile */}
        <GameAccordion
          className="md:col-span-2 md:grid md:grid-cols-2 md:gap-sm md:space-y-0"
          breakpoint="md"
          passthroughOnDesktop
          defaultValue="race"
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
                  suppressHeaderOnMobile
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
                  suppressHeaderOnMobile
                />
              ),
            },
          ]}
        />
      </Stack>

      {/* Finish button relocated to bottom */}
      <Button variant="choice" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
        {t('finish')}
      </Button>
    </VStack>
  )
}
