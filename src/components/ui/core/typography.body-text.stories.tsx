import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BodyText } from '@/components/ui/core/typography'

import { StoryContainer } from '../../../../.storybook/story-container'

const meta: Meta<typeof BodyText> = {
  title: 'UI/Typography/BodyText',
  component: BodyText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'The realm stirs with ancient power, awaiting a worthy champion.' },
}

export default meta

type Story = StoryObj<typeof BodyText>

export const Default: Story = {}

export const Error: Story = { args: { tone: 'error' } }

export const Italic: Story = { args: { italic: true, tone: 'muted' } }

export const Muted: Story = { args: { tone: 'muted' } }

export const Centered: Story = {
  args: { align: 'center' },
  decorators: [
    (Story) => (
      <StoryContainer width="narrow">
        <Story />
      </StoryContainer>
    ),
  ],
}
