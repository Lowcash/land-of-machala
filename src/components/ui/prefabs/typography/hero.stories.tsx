import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { VStack } from '../../core/stack'
import { HeroDescription, HeroSubtitle, HeroTitle, PageHeader } from './hero'

const meta: Meta = {
  title: 'UI/Prefabs/Typography/Hero',
  tags: ['autodocs'],
}

export default meta

export const FullHeader: StoryObj<typeof PageHeader> = {
  render: () => (
    <PageHeader 
      title="Land of Machala" 
      subtitle="The Great Awakening" 
    />
  ),
}

export const CustomHero: StoryObj = {
  render: () => (
    <VStack align="center" gap="md" fullWidth>
      <HeroTitle>Rise of Heroes</HeroTitle>
      <HeroSubtitle>Choose your destiny</HeroSubtitle>
      <HeroDescription align="center">
        The shadows are lengthening over the Iron Mountains. 
        Will you stand against the coming darkness?
      </HeroDescription>
    </VStack>
  ),
}
