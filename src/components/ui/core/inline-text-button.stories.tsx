import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InlineTextButton } from '@/components/ui/core/inline-text-button'

const meta: Meta<typeof InlineTextButton> = {
  title: 'UI/Core/InlineTextButton',
  component: InlineTextButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Merchant Laws',
    onClick: () => undefined,
  },
}

export default meta

type Story = StoryObj<typeof InlineTextButton>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
