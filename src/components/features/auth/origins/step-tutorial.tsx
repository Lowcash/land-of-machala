import type { OriginStep } from '@/lib/auth/demo-data'

import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/layout'
import { BodyText, SectionTitle } from '@/components/ui/core/typography'
import { PrologueChoiceCard } from '@/components/ui/prefabs/origins/prologue-choice-card'

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
    <Card centered gap="5" layout="stack" padding="cozy" width="2xl">
      <SectionTitle
        description={step.description}
        descriptionSize="base"
        overline={step.eyebrow}
        showDivider
        titleSize="lg"
        title={step.title}
      />
      <section className="mx-auto w-full max-w-xl space-y-3 text-left">
        <BodyText align="center">{step.prompt}</BodyText>
        <ul className="space-y-2">
          {step.choices.map((choice, index) => {
            const isActive = selectedChoiceId === choice.id
            const optionLabel = String.fromCharCode(65 + index)

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
        </ul>
      </section>
      <Stack align="center" space="2">
        <Button disabled={!selectedChoiceId} onClick={onContinue}>
          Continue
        </Button>
        <Button onClick={onSkip} variant="ghost">
          Skip the prologue
        </Button>
      </Stack>
    </Card>
  )
}
