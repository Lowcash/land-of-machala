import type { Meta, StoryObj } from '@storybook/react'

import * as HeroPrefabs from '../prefabs/typography/hero'
import * as Prefabs from '../prefabs/typography/shared'
import { Stack } from './stack'
import { Heading, Text } from './typography'

const meta: Meta<typeof Heading> = {
  title: 'UI/Typography',
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

export const SemanticPrefabs: Story = {
  render: () => (
    <Stack gap="md">
      <Stack gap="xs">
        <Prefabs.Decoration>Decoration Label</Prefabs.Decoration>
        <Prefabs.Value>1,234 Gold</Prefabs.Value>
        <Prefabs.MutedText>This is a muted text prefab.</Prefabs.MutedText>
        <Prefabs.Description>
          This is a description prefab with italics and specific tokens.
        </Prefabs.Description>
      </Stack>

      <Stack gap="xs">
        <HeroPrefabs.HeroTitle>Hero Title</HeroPrefabs.HeroTitle>
        <HeroPrefabs.HeroSubtitle>Hero Subtitle Example</HeroPrefabs.HeroSubtitle>
        <HeroPrefabs.HeroDescription>
          Hero description using the prefab.
        </HeroPrefabs.HeroDescription>
        <HeroPrefabs.DecorativeLabel>Hero Decorative Label</HeroPrefabs.DecorativeLabel>
      </Stack>
    </Stack>
  ),
}
