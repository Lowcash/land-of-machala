import type { OriginStep } from '@/lib/auth/demo-data'
import { ORIGINS_TUTORIAL_COPY } from '@/lib/auth/origins-messages'
import { getOptionLabel } from '@/lib/format/option-label'

import { List } from '@/components/ui/core/layout'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { PrologueChoiceCard } from '@/components/ui/prefabs/origins/prologue-choice-card'

type PrologueStepProps = {
  onContinue: () => void
  onSelectChoice: (choiceId: string) => void
  onSkip: () => void
  selectedChoiceId: string | null
  step: OriginStep
}

export function PrologueStep({
  onContinue,
  onSelectChoice,
  onSkip,
  selectedChoiceId,
  step,
}: PrologueStepProps) {
  return (
    <OriginsCard.Root>
      <OriginsCard.Header
        description={step.description}
        overline={step.eyebrow}
        title={step.title}
      />
      <OriginsCard.Content>
        <OriginsCard.Prompt>{step.prompt}</OriginsCard.Prompt>
        <OriginsCard.List>
          {step.choices.map((choice, index) => {
            const isActive = selectedChoiceId === choice.id
            const optionLabel = getOptionLabel(index)

            return (
              <List.Item key={choice.id}>
                <PrologueChoiceCard
                  description={choice.description}
                  isActive={isActive}
                  onSelect={() => onSelectChoice(choice.id)}
                  optionLabel={optionLabel}
                  title={choice.title}
                />
              </List.Item>
            )
          })}
        </OriginsCard.List>
      </OriginsCard.Content>
      <OriginsCard.ProgressActions
        onPrimaryClick={onContinue}
        onSecondaryClick={onSkip}
        primaryDisabled={!selectedChoiceId}
        primaryLabel={ORIGINS_TUTORIAL_COPY.continueLabel}
        secondaryLabel={ORIGINS_TUTORIAL_COPY.skipLabel}
      />
    </OriginsCard.Root>
  )
}
