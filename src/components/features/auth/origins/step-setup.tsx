import type { CharacterStats, ClassOption, RaceOption } from '@/lib/auth/demo-data'
import { ORIGINS_SETUP_COPY } from '@/lib/auth/origins-messages'

import { Button } from '@/components/ui/core/button'
import { Field } from '@/components/ui/forms/field'
import { HeroStatsGrid } from '@/components/ui/prefabs/origins/hero-stats-grid'
import { OriginsCard } from '@/components/ui/prefabs/origins/origins-card'
import { SelectionColumn } from '@/components/ui/prefabs/origins/selection-column'

type StepSetupProps = {
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

export function StepSetup({
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
}: StepSetupProps) {
  return (
    <OriginsCard.Root>
      <OriginsCard.Header
        description={ORIGINS_SETUP_COPY.description}
        overline={ORIGINS_SETUP_COPY.overline}
        title={ORIGINS_SETUP_COPY.title}
      />
      <OriginsCard.Columns>
        <OriginsCard.Panel>
          <Field
            label={ORIGINS_SETUP_COPY.heroNameLabel}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onNameChange(event.target.value)
            }
            placeholder={ORIGINS_SETUP_COPY.heroNamePlaceholder}
            value={heroName}
          />
          <Button onClick={onRandomize} variant="secondary">
            {ORIGINS_SETUP_COPY.randomizeLabel}
          </Button>
          <HeroStatsGrid stats={stats} />
        </OriginsCard.Panel>
        <SelectionColumn
          items={races}
          onSelect={onRaceSelect}
          selectedId={selectedRaceId}
          title={ORIGINS_SETUP_COPY.raceTitle}
        />
        <SelectionColumn
          items={classes}
          onSelect={onClassSelect}
          selectedId={selectedClassId}
          title={ORIGINS_SETUP_COPY.classTitle}
        />
      </OriginsCard.Columns>
      <OriginsCard.ProgressActions
        onPrimaryClick={onFinish}
        onSecondaryClick={onBack}
        primaryDisabled={!canFinish}
        primaryLabel={ORIGINS_SETUP_COPY.confirmLabel}
        secondaryLabel={ORIGINS_SETUP_COPY.backLabel}
      />
    </OriginsCard.Root>
  )
}
