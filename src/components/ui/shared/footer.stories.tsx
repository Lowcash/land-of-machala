import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '@/components/ui/core/stack'
import { Description, MutedText } from '@/components/ui/prefabs/typography/shared'

import { Footer } from './footer'

const CURRENT_YEAR = new Date().getFullYear()

const meta: Meta<typeof Footer> = {
  title: 'Shared/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    versionLabel: 'Version',
    copyrightLabel: 'Land of Machala. All rights reserved.',
    year: CURRENT_YEAR,
    version: '0.9.0',
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}

export const InContext: Story = {
  render: (args) => (
    <VStack fullHeight justify="between" p="lg" gap="xl">
      <VStack gap="sm">
        <Description>Main application content would appear here.</Description>
        <MutedText>The footer anchors itself to the bottom of the viewport.</MutedText>
      </VStack>
      <Footer {...args} />
    </VStack>
  ),
}
