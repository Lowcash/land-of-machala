import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'
import { ScrollArea } from './scroll-area'
import { HStack, VStack } from './stack'
import { Heading, Text } from './typography'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/Core/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <Card p="md" className="w-80">
      <ScrollArea maxHeight="300px">
        <VStack gap="md">
          <Heading level="h3">The Ancient Chronicles</Heading>
          <VStack gap="sm">
            <Text variant="primary">
              In the age of dragons and kings, there was a land known as Machala. It was a place of
              magic and mystery, where the ley lines thrummed with power and the shadows held
              secrets older than the world itself.
            </Text>
            <Text variant="primary">
              The first king, Machala the Great, was said to have built the capital city with his
              own hands, carving it from the heart of the Iron Mountains. His reign was a time of
              peace and prosperity, but it was not to last.
            </Text>
            <Text variant="primary">
              A darkness grew in the west, a shadow that stretched across the land and choked the
              very breath from the world. It was known as the Void, a hunger that could not be
              satisfied, a cold that could not be warmed.
            </Text>
            <Text variant="primary">
              The chronicles tell of a final stand at the gates of the capital,
              where the last of the kings fell and the world was plunged into an age of darkness.
            </Text>
            <Text color="secondary" variant="small">
              End of fragment. More lore can be found in the Royal Archives.
            </Text>
          </VStack>
        </VStack>
      </ScrollArea>
    </Card>
  ),
}

export const InsideCard: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden" p="none">
      <VStack gap="none" fullWidth>
        <div className="border-b border-white/10 p-4">
          <Heading level="h4">Quest Log</Heading>
        </div>
        <ScrollArea maxHeight="200px">
          <VStack gap="sm" p="md">
            <Card variant="subtle" p="sm">
              <VStack gap="xs">
                <Text variant="large">Clean the Forest</Text>
                <Text variant="small" color="secondary">
                  Clear 10 corrupted spirits from the Whispering Woods.
                </Text>
              </VStack>
            </Card>
            <Card variant="subtle" p="sm">
              <VStack gap="xs">
                <Text variant="large">Deliver the Message</Text>
                <Text variant="small" color="secondary">
                  Take the sealed scroll to the Lord of Manor.
                </Text>
              </VStack>
            </Card>
            <Card variant="subtle" p="sm">
              <VStack gap="xs">
                <Text variant="large">Ancient Relics</Text>
                <Text variant="small" color="secondary">
                  Collect 3 fragments of the Sunstone.
                </Text>
              </VStack>
            </Card>
            <Card variant="subtle" p="sm">
              <VStack gap="xs">
                <Text variant="large">Missing Villagers</Text>
                <Text variant="small" color="secondary">
                  Inquire about the disappearances in Oakhaven.
                </Text>
              </VStack>
            </Card>
          </VStack>
        </ScrollArea>
      </VStack>
    </Card>
  ),
}
