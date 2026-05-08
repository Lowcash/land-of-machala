import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from '@/components/ui/core/card'
import { BodyText, LabelText } from '@/components/ui/core/typography'

import { StoryContainer } from '../../../../.storybook/story-container'

const meta: Meta<typeof Card> = {
  title: 'UI/Core/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <LabelText size="meta" tone="default" uppercase>
          Sample Content
        </LabelText>
        <BodyText tone="muted">
          This card contains some representative content to show padding and surface styling.
        </BodyText>
      </>
    ),
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  decorators: [
    (Story) => (
      <StoryContainer width="narrow">
        <Story />
      </StoryContainer>
    ),
  ],
}

export const ContentWidth: Story = {
  args: { centered: true, width: 'content' },
  decorators: [
    (Story) => (
      <StoryContainer width="full">
        <Story />
      </StoryContainer>
    ),
  ],
}
