'use client'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { DicesIcon } from '@/components/ui/icons'

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
    <VStack gap="md" md={{ height: 'full' }} height="auto" justify="between" fullWidth>
      <VStack gap="md" flex="none" fullWidth>
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
      </VStack>

      <CharacterStatsCard
        stats={stats}
        isReady={canFinish}
        statLabels={statLabels}
        uiLabels={uiLabels}
      />

      <VStack display="none" md={{ display: 'flex' }} fullWidth>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish} disabled={!canFinish}>
          {uiLabels.finish}
        </Button>
      </VStack>
    </VStack>
  )
}
