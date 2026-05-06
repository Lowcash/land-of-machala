import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from '@/components/ui/core/card'
import { BodyText, MetaLabel } from '@/components/ui/core/typography'

const meta: Meta<typeof Card> = {
  title: 'UI/Core/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <MetaLabel>Sample Content</MetaLabel>
        <BodyText tone="muted">
          This card contains some representative content to show padding and surface styling.
        </BodyText>
      </>
    ),
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Wide: Story = {
  args: { width: '3xl', centered: true },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}
