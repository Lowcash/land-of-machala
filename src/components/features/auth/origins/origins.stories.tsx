import type { Meta, StoryObj } from '@storybook/react'

import { STORY_STEPS } from '@/lib/game/data/origins'

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
