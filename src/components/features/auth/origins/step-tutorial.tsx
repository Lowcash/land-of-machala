'use client'

import { BookOpen, SkipForward } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { OriginsChoice, StoryStep } from '@/lib/game/data/origins'

import { FadeIn } from '@/components/ui/core/animations/fade-in'
import { HStack, VStack } from '@/components/ui/core/stack'
import { ActionLink } from '@/components/ui/interactive/action-link'
import { Choice, ChoiceItem } from '@/components/ui/interactive/choice'
import { FeatureIcon } from '@/components/ui/prefabs/feature-icon'
import { NarrativeText } from '@/components/ui/prefabs/typography/shared'

interface TutorialStepProps {
  step: StoryStep
  onChoice: (choice: OriginsChoice) => void
  onSkip: () => void
}

export function TutorialStep({ step, onChoice, onSkip }: TutorialStepProps) {
  const t = useTranslations('Auth.Origins')

  return (
    <VStack align="center" justify="center" fullWidth>
      <FadeIn key={step.id}>
        <VStack align="center" gap="sm">
          <FeatureIcon icon={BookOpen} color="gold" />

          <NarrativeText>{t(step.textKey)}</NarrativeText>

          <Choice>
            {step.choices.map((choice: OriginsChoice, idx: number) => (
              <ChoiceItem
                key={idx}
                index={idx}
                title={t(choice.textKey)}
                onClick={() => onChoice(choice)}
              />
            ))}
          </Choice>

          <HStack justify="center" fullWidth>
            <ActionLink icon={SkipForward} onClick={onSkip}>
              {t('tutorial.skip')}
            </ActionLink>
          </HStack>
        </VStack>
      </FadeIn>
    </VStack>
  )
}
