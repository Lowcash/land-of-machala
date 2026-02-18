import { BookOpen, SkipForward } from 'lucide-react'

import type { TranslatedStoryStep } from '@/lib/game/data/shared'

import { FadeIn } from '@/components/ui/core/animations/fade-in'
import { HStack, VStack } from '@/components/ui/core/stack'
import { ActionLink } from '@/components/ui/interactive/action-link'
import { Choice, ChoiceItem } from '@/components/ui/interactive/choice'
import { FeatureIcon } from '@/components/ui/prefabs/feature-icon'
import { NarrativeText } from '@/components/ui/prefabs/typography/shared'

interface TutorialStepProps {
  step: TranslatedStoryStep
  onChoice: (choice: any) => void
  onSkip: () => void
  uiLabels: {
    skip: string
  }
}

export function TutorialStep({ step, onChoice, onSkip, uiLabels }: TutorialStepProps) {
  return (
    <VStack fullWidth align="center" justify="center">
      <FadeIn key={step.id}>
        <VStack align="center" gap="md">
          <FeatureIcon icon={BookOpen} color="gold" />

          <NarrativeText>{step.text}</NarrativeText>

          <Choice>
            {step.choices.map((choice, idx: number) => (
              <ChoiceItem
                key={idx}
                index={idx}
                title={choice.text}
                onClick={() => onChoice(choice)}
              />
            ))}
          </Choice>

          <HStack justify="center" fullWidth>
            <ActionLink icon={SkipForward} onClick={onSkip}>
              {uiLabels.skip}
            </ActionLink>
          </HStack>
        </VStack>
      </FadeIn>
    </VStack>
  )
}
