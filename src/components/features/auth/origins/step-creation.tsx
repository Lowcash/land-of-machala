import type { CharacterStats, ClassOption, RaceOption } from '@/lib/auth/demo-data'
import { ORIGINS_CREATION_COPY } from '@/lib/auth/origins-copy'

import { Button } from '@/components/ui/core/button'
import { SectionTitle } from '@/components/ui/core/typography'
import { Field } from '@/components/ui/forms/field'
import { HeroStatsGrid } from '@/components/ui/prefabs/origins/hero-stats-grid'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { SelectionColumn } from '@/components/ui/prefabs/origins/selection-column'

type StepCreationProps = {
  canFinish: boolean
  classes: ClassOption[]
  heroName: string
  onBack: () => void
  onClassSelect: (classId: ClassOption['id']) => void
  onFinish: () => void
  onNameChange: (name: string) => void
  onRaceSelect: (raceId: RaceOption['id']) => void
  onRandomize: () => void
  races: RaceOption[]
  selectedClassId: ClassOption['id']
  selectedRaceId: RaceOption['id']
  stats: CharacterStats
}

export function StepCreation({
  canFinish,
  classes,
  heroName,
  onBack,
  onClassSelect,
  onFinish,
  onNameChange,
  onRaceSelect,
  onRandomize,
  races,
  selectedClassId,
  selectedRaceId,
  stats,
}: StepCreationProps) {
  return (
    <OriginsCard.Root width="wide">
      <SectionTitle
        description={ORIGINS_CREATION_COPY.description}
        descriptionSize="base"
        overline={ORIGINS_CREATION_COPY.overline}
        showDivider
        titleSize="lg"
        title={ORIGINS_CREATION_COPY.title}
      />
      <OriginsCard.Columns>
        <SelectionColumn
          items={races}
          onSelect={onRaceSelect}
          selectedId={selectedRaceId}
          title={ORIGINS_CREATION_COPY.raceTitle}
        />
        <SelectionColumn
          items={classes}
          onSelect={onClassSelect}
          selectedId={selectedClassId}
          title={ORIGINS_CREATION_COPY.classTitle}
        />
        <OriginsCard.Panel>
          <Field
            label={ORIGINS_CREATION_COPY.heroNameLabel}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onNameChange(event.target.value)
            }
            placeholder={ORIGINS_CREATION_COPY.heroNamePlaceholder}
            value={heroName}
          />
          <Button onClick={onRandomize} size="md" variant="secondary">
            {ORIGINS_CREATION_COPY.randomizeLabel}
          </Button>
          <HeroStatsGrid stats={stats} />
        </OriginsCard.Panel>
      </OriginsCard.Columns>
      <OriginsCard.Footer>
        <Button onClick={onBack} variant="ghost">
          {ORIGINS_CREATION_COPY.backLabel}
        </Button>
        <Button disabled={!canFinish} onClick={onFinish}>
          {ORIGINS_CREATION_COPY.confirmLabel}
        </Button>
      </OriginsCard.Footer>
    </OriginsCard.Root>
  )
}
