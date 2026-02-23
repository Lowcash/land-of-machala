import type { Meta, StoryObj } from '@storybook/react'

import { Sword } from 'lucide-react'

import { Heading, Text } from './typography'
import { HStack } from './stack'

const meta: Meta<typeof Heading> = {
  title: 'UI/Core/Typography',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Headings: Story = {
  render: () => (
    <>
      <Heading level="h1">The King's Decree (H1)</Heading>
      <Heading level="h2">The Lord's Manor (H2)</Heading>
      <Heading level="h3">The Knight's Shield (H3)</Heading>
      <Heading level="h4">The Guard's Post (H4)</Heading>
    </>
  ),
}

export const Texts: Story = {
  render: () => (
    <>
      <Text variant="lead">This is lead text, fit for the start of a legendary tale.</Text>
      <Text variant="primary">
        This is default text. It is easy to read and follows the medieval theme with its slightly
        muted ivory tone.
      </Text>
      <Text variant="large">This is large text, emphasizing important information.</Text>
      <Text variant="small">This is small text, perfect for footnotes or minor details.</Text>
      <Text variant="muted">
        This is muted text, used for secondary info that shouldn't stand out too much.
      </Text>
      <Text variant="fantasy-value">1234567890 (Fantasy Value)</Text>
    </>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <HStack align="center" gap="sm">
      <Sword className="text-(--color-gold)" size={20} />
      <Heading level="h3">The Warrior's Path</Heading>
    </HStack>
  ),
}
