import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { STORY_STEPS } from '@/lib/game/data/origins'
import { RACES } from '@/lib/game/data/races'

import { StepCreation } from '@/components/features/auth/origins/step-creation'
import { TutorialStep } from '@/components/features/auth/origins/step-tutorial'
import { OriginsViewUI } from '@/components/features/auth/origins/view'
import { AuthPageLayout } from '@/components/features/auth/shared/auth-page-layout'

const meta: Meta<typeof OriginsViewUI> = {
  title: 'Features/Auth/Origins',
  component: OriginsViewUI,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OriginsViewUI>

export const FullPage: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AuthPageLayout>
        <Story />
      </AuthPageLayout>
    ),
  ],
}

export const TutorialStepStory: StoryObj<typeof TutorialStep> = {
  name: 'TutorialStep',
  render: () => <TutorialStep step={STORY_STEPS[0]} onChoice={() => {}} onSkip={() => {}} />,
}

const CreationWrapper = () => {
  const [name, setName] = React.useState('Lothar')
  const [raceId, setRaceId] = React.useState(RACES[0].id)
  const [classId, setClassId] = React.useState('warrior')

  const selectedRace = RACES.find((r) => r.id === raceId) || RACES[0]

  return (
    <StepCreation
      name={name}
      onNameChange={setName}
      onRandomize={() => setName('Náhodný Hrdina')}
      onFinish={() => {}}
      selectedRaceId={raceId}
      onRaceSelect={setRaceId}
      selectedClassId={classId}
      onClassSelect={setClassId}
      stats={selectedRace.stats}
    />
  )
}

export const CreationStepStory: StoryObj<typeof StepCreation> = {
  name: 'CharacterCreation',
  render: () => <CreationWrapper />,
}
