import type { OriginStep } from '@/lib/auth/demo-data'
import { ORIGINS_TUTORIAL_COPY } from '@/lib/auth/origins-copy'

import { Button } from '@/components/ui/core/button'
import { BodyText, SectionTitle } from '@/components/ui/core/typography'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { PrologueChoiceCard } from '@/components/ui/prefabs/origins/prologue-choice-card'

const OPTION_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function getOptionLabel(index: number) {
  return OPTION_LABELS[index] ?? `${index + 1}`
}

type TutorialStepProps = {
  onContinue: () => void
  onSelectChoice: (choiceId: string) => void
  onSkip: () => void
  selectedChoiceId: string | null
  step: OriginStep
}

export function TutorialStep({
  onContinue,
  onSelectChoice,
  onSkip,
  selectedChoiceId,
  step,
}: TutorialStepProps) {
  return (
    <OriginsCard.Root width="narrow">
      <SectionTitle
        description={step.description}
        descriptionSize="base"
        overline={step.eyebrow}
        showDivider
        titleSize="lg"
        title={step.title}
      />
      <OriginsCard.Content>
        <BodyText align="center">{step.prompt}</BodyText>
        <OriginsCard.List gap="sm">
          {step.choices.map((choice, index) => {
            const isActive = selectedChoiceId === choice.id
            const optionLabel = getOptionLabel(index)

            return (
              <li key={choice.id}>
                <PrologueChoiceCard
                  description={choice.description}
                  isActive={isActive}
                  onSelect={() => onSelectChoice(choice.id)}
                  optionLabel={optionLabel}
                  title={choice.title}
                />
              </li>
            )
          })}
        </OriginsCard.List>
      </OriginsCard.Content>
      <OriginsCard.Actions>
        <Button disabled={!selectedChoiceId} onClick={onContinue}>
          {ORIGINS_TUTORIAL_COPY.continueLabel}
        </Button>
        <Button onClick={onSkip} variant="ghost">
          {ORIGINS_TUTORIAL_COPY.skipLabel}
        </Button>
      </OriginsCard.Actions>
    </OriginsCard.Root>
  )
}
