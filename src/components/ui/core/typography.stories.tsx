import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Text } from './typography'
import { VStack, HStack } from './stack'

const meta: Meta<typeof Heading> = {
  title: 'Core/Typography',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Headings: Story = {
  render: () => (
    <VStack gap="md" align="start">
      <Heading level={1}>The King's Decree (H1)</Heading>
      <Heading level={2}>The Lord's Manor (H2)</Heading>
      <Heading level={3}>The Knight's Shield (H3)</Heading>
      <Heading level={4}>The Guard's Post (H4)</Heading>
      <Heading level={5}>The Villager's Hut (H5)</Heading>
      <Heading level={6}>The Scribe's Note (H6)</Heading>
    </VStack>
  ),
}

export const BodyText: Story = {
  render: () => (
    <VStack gap="lg" maxWidth="prose" align="start">
      <VStack gap="xs" align="start">
        <Heading level={3}>Body Typography</Heading>
        <Text variant="primary">
          The Primary variant is the main body text for narrative descriptions and lore. 
          It carries the weight of the story and the history of Machala.
        </Text>
      </VStack>

      <VStack gap="xs" align="start">
        <Heading level={4}>Lead & Large</Heading>
        <Text variant="lead">
          The Lead variant is used for important introductory paragraphs or special highlights.
        </Text>
        <Text variant="large">
          The Large variant provides a bit more prominence than the base text.
        </Text>
      </VStack>

      <VStack gap="xs" align="start">
        <Heading level={4}>Muted & Detail</Heading>
        <Text variant="muted">
          The Muted variant is perfect for secondary information or less critical lore details.
        </Text>
        <Text variant="detail">
          The Detail variant is intended for small notes, legal text, or very fine metadata.
        </Text>
      </VStack>

      <VStack gap="xs" align="start">
        <Heading level={4}>Special Variants</Heading>
        <Text variant="fantasy-value" font="fantasy">
          1,250 Gold
        </Text>
        <Text variant="bonus" color="success">
          +15 Strength Bonus
        </Text>
        <Text variant="tiny">
          Updated 3 seconds ago
        </Text>
      </VStack>
    </VStack>
  ),
}

export const ResponsiveText: Story = {
  render: () => (
    <VStack gap="lg" align="start">
      <Heading level={3}>Responsive Behavior</Heading>
      <Text 
        variant="small" 
        sm={{ variant: 'large' }} 
        md={{ variant: 'lead' }}
      >
        I change size based on the screen width! (Small on mobile, Lead on desktop)
      </Text>
      
      <HStack gap="sm" wrap sm={{ nowrap: true }}>
        <VStack p="sm" bgColor="secondary" opacity="10" flex="1">
          <Text variant="tiny">Column A</Text>
        </VStack>
        <VStack p="sm" bgColor="secondary" opacity="10" flex="1">
          <Text variant="tiny">Column B</Text>
        </VStack>
      </HStack>
    </VStack>
  ),
}
