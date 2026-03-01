import { BookOpen, SkipForward } from 'lucide-react'

import type { TranslatedStoryStep, TranslatedStoryStepChoice } from '@/lib/game/data/shared'

import { HStack } from '@/components/ui/core/stack'
import { ActionLink } from '@/components/ui/interactive/action-link'
import { Choice, ChoiceItem } from '@/components/ui/interactive/choice'
import { EntranceStack } from '@/components/ui/prefabs/animations/entrance-stack'
import { FeatureIcon } from '@/components/ui/prefabs/game/feature-icon'
import { NarrativeText } from '@/components/ui/prefabs/typography/shared'

import type { TutorialUiLabels } from './types'

interface TutorialStepProps {
  step: TranslatedStoryStep
  onChoice: (choice: TranslatedStoryStepChoice) => void
  onSkip: () => void
  uiLabels: TutorialUiLabels
}

export function TutorialStep({ step, onChoice, onSkip, uiLabels }: TutorialStepProps) {
  return (
    <EntranceStack key={step.id} fullWidth align="center" justify="center" gap="md">
      <FeatureIcon icon={BookOpen} color="gold" />

      <NarrativeText>{step.text}</NarrativeText>

      <Choice>
        {step.choices.map((choice, idx) => (
          <ChoiceItem key={idx} index={idx} title={choice.text} onClick={() => onChoice(choice)} />
        ))}
      </Choice>

      <HStack justify="center" fullWidth>
        <ActionLink icon={SkipForward} onClick={onSkip}>
          {uiLabels.skip}
        </ActionLink>
      </HStack>
    </EntranceStack>
  )
}
