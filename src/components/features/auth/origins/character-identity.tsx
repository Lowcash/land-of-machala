'use client'

import { Button } from '@/components/ui/core/button'
import { Text } from '@/components/ui/core/typography'
import { DicesIcon } from '@/components/ui/icons'
import { FeatureSection } from '@/components/ui/prefabs/structure'

import { CharacterNameCard } from './character-name-card'
import { CharacterStatsCard } from './character-stats-card'

interface CharacterIdentityProps {
  name: string
  onNameChange: (name: string) => void
  onRandomize: () => void
  stats: any
  onFinish: () => void
  canFinish: boolean
  statLabels: Record<string, string>
  uiLabels: any
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
    <FeatureSection md={{ height: 'full' }} height="full" justify="between">
      <FeatureSection>
        <CharacterNameCard
          name={name}
          label={uiLabels.nameLabel}
          placeholder={uiLabels.namePlaceholder}
          onChange={onNameChange}
        />

        <Button variant="secondary" size="action" onClick={onRandomize}>
          <DicesIcon size="md" />
          <Text variant="small" font="fantasy">
            {uiLabels.randomize}
          </Text>
        </Button>
      </FeatureSection>

      <CharacterStatsCard
        stats={stats}
        isReady={canFinish}
        statLabels={statLabels}
        uiLabels={uiLabels}
      />

      <FeatureSection display="none" md={{ display: 'flex' }}>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
          {uiLabels.finish}
        </Button>
      </FeatureSection>
    </FeatureSection>
  )
}
