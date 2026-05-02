import type { CharacterStats, ClassOption, RaceOption } from '@/lib/auth/demo-data'

import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { Box } from '@/components/ui/core/layout'
import { SectionTitle } from '@/components/ui/core/typography'
import { Field } from '@/components/ui/forms/field'
import { HeroStatsGrid } from '@/components/ui/prefabs/origins/hero-stats-grid'
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
    <Card centered gap="5" layout="stack" padding="cozy" width="4xl">
      <SectionTitle
        description="Review race, class, and hero name before entering realm."
        descriptionSize="base"
        overline="Setup"
        showDivider
        titleSize="lg"
        title="Shape your hero"
      />
      <section className="grid gap-3 lg:grid-cols-[1fr_1fr_0.9fr]">
        <SelectionColumn
          items={races}
          onSelect={onRaceSelect}
          selectedId={selectedRaceId}
          title="Race"
        />
        <SelectionColumn
          items={classes}
          onSelect={onClassSelect}
          selectedId={selectedClassId}
          title="Class"
        />
        <Box border className="space-y-3" padding="md" radius="xl" tone="panel">
          <Field
            label="Hero name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onNameChange(event.target.value)
            }
            placeholder="Ardyn Vale"
            value={heroName}
          />
          <Button onClick={onRandomize} size="md" variant="secondary">
            Roll a random hero
          </Button>
          <HeroStatsGrid stats={stats} />
        </Box>
      </section>
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={onBack} variant="ghost">
          Back to prologue
        </Button>
        <Button disabled={!canFinish} onClick={onFinish}>
          Confirm hero
        </Button>
      </section>
    </Card>
  )
}
