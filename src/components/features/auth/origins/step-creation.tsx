'use client'

import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'

import type { CreationUiLabels } from './types'

import { Button } from '@/components/ui/core/button'
import { Stack, VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { FeatureSection } from '@/components/ui/prefabs/structure'
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
  races: TranslatedRaceInfo[]
  classes: TranslatedClassInfo[]
  statLabels: Record<string, string>
  uiLabels: CreationUiLabels
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
  races,
  classes,
  statLabels,
  uiLabels,
}: StepCreationProps) {
  return (
    <VStack gap="lg" align="center" fullWidth>
      <PageHeader title={uiLabels.title} subtitle={uiLabels.subtitle} />

      {/* Main content grid */}
      <Stack
        display="grid"
        cols="1"
        gap="md"
        fullWidth
        md={{ cols: '3', maxWidth: '5xl', height: 'creation' }}
        minHeight="zero"
        height="auto"
      >
        {/* Column 1: Identity & Stats */}
        <CharacterIdentity
          name={name}
          onNameChange={onNameChange}
          onRandomize={onRandomize}
          stats={stats}
          onFinish={onFinish}
          canFinish={canFinish}
          statLabels={statLabels}
          uiLabels={uiLabels}
        />

        {/* Column 2 & 3: Mobile Accordion (Hidden on Desktop) */}
        <FeatureSection md={{ display: 'none' }}>
          <GameAccordion
            items={[
              {
                value: 'race',
                title: uiLabels.raceLabel,
                selectedLabel: races.find((r) => r.id === selectedRaceId)?.name,
                content: (
                  <SelectionBox
                    title={uiLabels.raceLabel}
                    items={races}
                    selectedId={selectedRaceId}
                    onSelect={onRaceSelect}
                    type="race"
                    variant="flat"
                    statLabels={statLabels}
                    uiLabels={uiLabels}
                  />
                ),
              },
              {
                value: 'class',
                title: uiLabels.classLabel,
                selectedLabel: classes.find((c) => c.id === selectedClassId)?.name,
                content: (
                  <SelectionBox
                    title={uiLabels.classLabel}
                    items={classes}
                    selectedId={selectedClassId}
                    onSelect={onClassSelect}
                    type="class"
                    variant="flat"
                    statLabels={statLabels}
                    uiLabels={uiLabels}
                  />
                ),
              },
            ]}
          />
        </FeatureSection>

        {/* Column 2: Desktop Race Selection (Hidden on Mobile) */}
        <FeatureSection display="none" md={{ display: 'flex' }} height="full" minHeight="zero">
          <SelectionBox
            title={uiLabels.raceLabel}
            items={races}
            selectedId={selectedRaceId}
            onSelect={onRaceSelect}
            type="race"
            statLabels={statLabels}
            uiLabels={uiLabels}
          />
        </FeatureSection>

        {/* Column 3: Desktop Class Selection (Hidden on Mobile) */}
        <FeatureSection display="none" md={{ display: 'flex' }} height="full" minHeight="zero">
          <SelectionBox
            title={uiLabels.classLabel}
            items={classes}
            selectedId={selectedClassId}
            onSelect={onClassSelect}
            type="class"
            statLabels={statLabels}
            uiLabels={uiLabels}
          />
        </FeatureSection>
      </Stack>

      <FeatureSection md={{ display: 'none' }}>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
          {uiLabels.finish}
        </Button>
      </FeatureSection>
    </VStack>
  )
}
