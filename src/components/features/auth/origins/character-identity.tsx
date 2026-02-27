'use client'

import { Button } from '@/components/ui/core/button'
import { Text } from '@/components/ui/core/typography'
import { DicesIcon } from '@/components/ui/icons'
import { ActionGroup, FeatureSection } from '@/components/ui/prefabs/structure'

import { CharacterNameCard } from './character-name-card'
import { CharacterStatsCard } from './character-stats-card'
import type { CreationUiLabels } from './types'

interface CharacterIdentityProps {
  name: string
  onNameChange: (name: string) => void
  onRandomize: () => void
  stats: any
  onFinish: () => void
  canFinish: boolean
  statLabels: Record<string, string>
  uiLabels: CreationUiLabels
}

export function CharacterIdentity({
  name,
  onNameChange,
  onRandomize,
  stats,
  onFinish,
  canFinish,
  statLabels,
  uiLabels,
}: CharacterIdentityProps) {
  return (
    <FeatureSection height="full" justify="between" gap="md">
      <CharacterNameCard
        name={name}
        label={uiLabels.nameLabel}
        placeholder={uiLabels.namePlaceholder}
        onChange={onNameChange}
      />

      <ActionGroup align="center">
        <Button variant="secondary" size="action" onClick={onRandomize}>
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
      />

      <ActionGroup display="none" md={{ display: 'flex' }}>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
          {uiLabels.finish}
        </Button>
      </ActionGroup>
    </FeatureSection>
  )
}
