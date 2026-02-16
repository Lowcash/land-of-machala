import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { STORY_STEPS } from '@/lib/game/data/origins'

import { StepCreation } from '@/components/features/auth/origins/step-creation'
import { TutorialStep } from '@/components/features/auth/origins/step-tutorial'
import { useCharacterCreation } from '@/components/features/auth/origins/use-origins'
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
  const {
    characterName,
    setName,
    handleRandomize,
    selectedRaceId,
    setSelectedRaceId,
    selectedClassId,
    setSelectedClassId,
    totalStats,
  } = useCharacterCreation()

  return (
    <StepCreation
      name={characterName}
      onNameChange={setName}
      onRandomize={handleRandomize}
      onFinish={() => {}}
      selectedRaceId={selectedRaceId}
      onRaceSelect={setSelectedRaceId}
      selectedClassId={selectedClassId}
      onClassSelect={setSelectedClassId}
      stats={totalStats}
      canFinish={characterName.trim().length > 0}
    />
  )
}

export const CreationStepStory: StoryObj<typeof StepCreation> = {
  name: 'CharacterCreation',
  render: () => <CreationWrapper />,
}
