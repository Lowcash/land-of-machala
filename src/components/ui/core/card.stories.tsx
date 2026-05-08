import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from '@/components/ui/core/card'
import { BodyText, LabelText } from '@/components/ui/core/typography'
import { withCanvasWidth } from '@/test/story-decorators'

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

export const Default: Story = {}

export const ContentWidth: Story = {
  args: { width: 'content', centered: true },
  decorators: [withCanvasWidth('w-[min(100vw-3rem,56rem)]')],
}
