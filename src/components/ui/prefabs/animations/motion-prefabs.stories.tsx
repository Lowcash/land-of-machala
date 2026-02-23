import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

import { FadeIn, PresenceSwap, ScaleIn, SlideUp, StaggeredList } from './motion-prefabs'

const meta: Meta = {
  title: 'UI/Prefabs/Animations/MotionPrefabs',
}

export default meta
type Story = StoryObj<typeof meta>

export const FadeInDemo: Story = {
  name: 'FadeIn',
  render: () => (
    <FadeIn>
      <Card p="md">
        <MutedText>This card faded in on mount.</MutedText>
      </Card>
    </FadeIn>
  ),
}

export const SlideUpDemo: Story = {
  name: 'SlideUp',
  render: () => (
    <SlideUp>
      <Card p="md">
        <MutedText>This card slid up on mount.</MutedText>
      </Card>
    </SlideUp>
  ),
}

export const ScaleInDemo: Story = {
  name: 'ScaleIn',
  render: () => (
    <ScaleIn>
      <Card p="md">
        <MutedText>This card popped in on mount.</MutedText>
      </Card>
    </ScaleIn>
  ),
}

export const StaggeredListDemo: Story = {
  name: 'StaggeredList',
  render: () => (
    <StaggeredList stagger={0.1}>
      <Card p="sm">
        <MutedText>First item</MutedText>
      </Card>
      <Card p="sm">
        <MutedText>Second item</MutedText>
      </Card>
      <Card p="sm">
        <MutedText>Third item</MutedText>
      </Card>
      <Card p="sm">
        <MutedText>Fourth item</MutedText>
      </Card>
    </StaggeredList>
  ),
}

export const PresenceSwapDemo: Story = {
  name: 'PresenceSwap',
  render: () => (
    <PresenceSwap swapKey="static-key">
      <Card p="md">
        <MutedText>Content swaps via AnimatePresence when swapKey changes.</MutedText>
      </Card>
    </PresenceSwap>
  ),
}
