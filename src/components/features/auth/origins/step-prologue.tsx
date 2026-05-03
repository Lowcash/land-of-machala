import type { OriginStep } from '@/lib/auth/demo-data'
import { ORIGINS_TUTORIAL_COPY } from '@/lib/auth/origins-copy'

import { Button } from '@/components/ui/core/button'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { PrologueChoiceCard } from '@/components/ui/prefabs/origins/prologue-choice-card'

const OPTION_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function getOptionLabel(index: number) {
  return OPTION_LABELS[index] ?? `${index + 1}`
}

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
              <OriginsCard.ListItem key={choice.id}>
                <PrologueChoiceCard
                  description={choice.description}
                  isActive={isActive}
                  onSelect={() => onSelectChoice(choice.id)}
                  optionLabel={optionLabel}
                  title={choice.title}
                />
              </OriginsCard.ListItem>
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
