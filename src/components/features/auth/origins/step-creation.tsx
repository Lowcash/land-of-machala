'use client'

import { useTranslations } from 'next-intl'

import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

import { Button } from '@/components/ui/core/button'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { DicesIcon } from '@/components/ui/icons'
import { PageHeader } from '@/components/ui/prefabs/typography/page-header'

import { CharacterNameCard } from './character-name-card'
import { CharacterStatsCard } from './character-stats-card'
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
}: StepCreationProps) {
  const t = useTranslations('Auth.Origins.creation')

  return (
    <VStack align="center" gap="lg" fullWidth>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Main content grid */}
      <Stack
        display="grid"
        cols="1"
        gap="md"
        fullWidth
        maxWidth="5xl"
        md={{ cols: '3', align: 'stretch' }}
      >
        {/* Column 1: Identity & Stats */}
        <VStack gap="md" fullHeight>
          <CharacterNameCard
            name={name}
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
            onChange={onNameChange}
          />

          <Button variant="primary" onClick={onRandomize}>
            <DicesIcon size="md" />
            <Text font="fantasy">{t('randomize_button')}</Text>
          </Button>

          <CharacterStatsCard stats={stats} fullHeight />
        </VStack>

        {/* Column 2: Race Selection */}
        <SelectionBox
          title={t('raceLabel')}
          items={RACES}
          selectedId={selectedRaceId}
          onSelect={onRaceSelect}
          type="race"
        />

        {/* Column 3: Class Selection */}
        <SelectionBox
          title={t('classLabel')}
          items={CLASSES}
          selectedId={selectedClassId}
          onSelect={onClassSelect}
          type="class"
        />
      </Stack>

      {/* Finish button relocated to bottom */}
      <Button variant="choice" size="lg" fullWidth onClick={onFinish} disabled={!name.trim()}>
        {t('finish')}
      </Button>
    </VStack>
  )
}
