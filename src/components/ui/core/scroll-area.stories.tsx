import type { Meta, StoryObj } from '@storybook/react'

import { StoryContainer } from '../storybook-utils'
import { Card } from './card'
import { ScrollArea } from './scroll-area'
import { VStack } from './stack'
import { Heading, Text } from './typography'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/Core/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StoryContainer width="md" height="selection">
        <Story />
      </StoryContainer>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea fullHeight gap="md" p="md" {...{ variant: 'subtle', overrideP: true }}>
      <Heading level="h3">The Ancient Chronicles</Heading>
      <VStack gap="sm">
        <Text variant="primary">
          In the age of dragons and kings, there was a land known as Machala. It was a place of
          magic and mystery, where the ley lines thrummed with power and the shadows held secrets
          older than the world itself.
        </Text>
        <Text variant="primary">
          The first king, Machala the Great, was said to have built the capital city with his own
          hands, carving it from the heart of the Iron Mountains. His reign was a time of peace and
          prosperity, but it was not to last.
        </Text>
        <Text variant="primary">
          A darkness grew in the west, a shadow that stretched across the land and choked the very
          breath from the world. It was known as the Void, a hunger that could not be satisfied, a
          cold that could not be warmed.
        </Text>
        <Text variant="primary">
          The chronicles tell of a final stand at the gates of the capital, where the last of the
          kings fell and the world was plunged into an age of darkness.
        </Text>
        <Text color="secondary" variant="small">
          End of fragment. More lore can be found in the Royal Archives.
        </Text>
      </VStack>
    </ScrollArea>
  ),
}

export const InsideCard: Story = {
  render: () => (
    <Card fullHeight p="none">
      <Card.Header px="md" pt="md">
        <Heading level="h4">Quest Log</Heading>
      </Card.Header>

      <ScrollArea as={Card.Content} isFlexible px="sm" gap="md">
        <Card variant="subtle" p="sm" gap="xs">
          <Text variant="large">Clean the Forest</Text>
          <Text variant="small" color="secondary">
            Clear 10 corrupted spirits from the Whispering Woods.
          </Text>
        </Card>
        <Card variant="subtle" p="sm" gap="xs">
          <Text variant="large">Deliver the Message</Text>
          <Text variant="small" color="secondary">
            Take the sealed scroll to the Lord of Manor.
          </Text>
        </Card>
        <Card variant="subtle" p="sm" gap="xs">
          <Text variant="large">Ancient Relics</Text>
          <Text variant="small" color="secondary">
            Collect 3 fragments of the Sunstone.
          </Text>
        </Card>
        <Card variant="subtle" p="sm" gap="xs">
          <Text variant="large">Missing Villagers</Text>
          <Text variant="small" color="secondary">
            Inquire about the disappearances in Oakhaven.
          </Text>
        </Card>
      </ScrollArea>

      <Card.Footer px="md" pb="md">
        <Text variant="small" color="secondary">
          4 Quests Active
        </Text>
      </Card.Footer>
    </Card>
  ),
}
