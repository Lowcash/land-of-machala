import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Stack } from '@/components/ui/core/layout'
import { LabelText } from '@/components/ui/core/typography'

const meta: Meta<typeof LabelText> = {
  title: 'UI/Typography/LabelText',
  component: LabelText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof LabelText>

export const Default: Story = {
  name: 'LabelText / Default',
  args: { children: 'System notice', tone: 'default' },
}

export const Muted: Story = {
  name: 'LabelText / Muted',
  args: { children: 'Recent chronicles', tone: 'muted' },
}

export const Primary: Story = {
  name: 'LabelText / Primary',
  args: { children: 'Hero name' },
}

export const PrimaryUppercase: Story = {
  name: 'LabelText / Primary uppercase',
  args: { children: 'Field label', uppercase: true },
}

export const SoftMeta: Story = {
  name: 'LabelText / Soft meta',
  args: { children: '2 hours ago', size: 'label', tone: 'soft', uppercase: true },
}

export const Error: Story = {
  name: 'LabelText / Error',
  args: { children: 'Invalid spell scroll', tone: 'error' },
}

export const ToneComparison: Story = {
  name: 'LabelText / Tone comparison',
  render: () => (
    <Stack>
      <LabelText tone="default">System notice (default)</LabelText>
      <LabelText tone="muted">Recent chronicles (muted)</LabelText>
      <LabelText size="label" tone="soft" uppercase>
        2 hours ago (soft)
      </LabelText>
    </Stack>
  ),
}
