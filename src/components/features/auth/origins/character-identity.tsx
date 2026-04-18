'use client'

import { Button } from '@/components/ui/core/button'
import { Text } from '@/components/ui/core/typography'
import { DicesIcon } from '@/components/ui/icons'
import { ActionGroup, FeatureSection } from '@/components/ui/prefabs/structure'

import { CharacterNameCard } from './character-name-card'
import { CharacterStatsCard } from './character-stats-card'
import type { CharacterStats, CreationUiLabels } from './types'

interface CharacterIdentityProps {
  name: string
  onNameChange: (name: string) => void
  onRandomize: () => void
  stats: CharacterStats
  onFinish: () => void
  canFinish: boolean
  isLoading?: boolean
  statLabels: Record<string, string>
  uiLabels: CreationUiLabels
  raceBonuses?: string
  classBonuses?: string
}

export function CharacterIdentity({
  name,
  onNameChange,
  onRandomize,
  stats,
  onFinish,
  canFinish,
  isLoading,
  statLabels,
  uiLabels,
  raceBonuses,
  classBonuses,
}: CharacterIdentityProps) {
  return (
    <FeatureSection
      height="creation"
      md={{ height: 'full' }}
      minHeight="zero"
      justify="between"
      gap="md"
    >
      <CharacterNameCard
        name={name}
        label={uiLabels.nameLabel}
        placeholder={uiLabels.namePlaceholder}
        onChange={onNameChange}
      />

      <ActionGroup align="center">
        <Button variant="secondary" size="action" onClick={onRandomize} disabled={isLoading}>
          <DicesIcon size="md" />
          <Text variant="small" font="fantasy">
            {uiLabels.randomize}
          </Text>
        </Button>
      </ActionGroup>

      <CharacterStatsCard
        stats={stats}
        isReady={canFinish}
        statLabels={statLabels}
        uiLabels={uiLabels}
        raceBonuses={raceBonuses}
        classBonuses={classBonuses}
      />

      <ActionGroup display="none" md={{ display: 'flex' }}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onFinish}
          disabled={!canFinish || isLoading}
          loading={isLoading}
        >
          {uiLabels.finish}
        </Button>
      </ActionGroup>
    </FeatureSection>
  )
}
