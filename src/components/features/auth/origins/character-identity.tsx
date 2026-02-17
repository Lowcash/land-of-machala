'use client'

import { useTranslations } from 'next-intl'

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
}

export function CharacterIdentity({
  name,
  onNameChange,
  onRandomize,
  stats,
  onFinish,
  canFinish,
}: CharacterIdentityProps) {
  const t = useTranslations('Auth.Origins.creation')

  return (
    <VStack gap="md" height="creation" justify="between">
      <CharacterNameCard
        name={name}
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        onChange={onNameChange}
      />

      <Button variant="primary" size="action" onClick={onRandomize}>
        <DicesIcon size="md" />
        <Text font="fantasy">{t('randomize_button')}</Text>
      </Button>

      <CharacterStatsCard stats={stats} />

      <VStack display="none" md={{ display: 'flex' }} fullWidth>
        <Button
          variant="choice"
          size="lg"
          fullWidth
          onClick={onFinish}
          disabled={!canFinish}
        >
          {t('finish')}
        </Button>
      </VStack>
    </VStack>
  )
}
