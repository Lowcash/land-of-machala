import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BrandWordmark } from '@/components/ui/core/typography'
import { PageHeadline, SectionHeading } from '@/components/ui/prefabs/typography'

const meta: Meta<typeof PageHeadline> = {
  title: 'UI/Typography/Prefabs',
  component: PageHeadline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof PageHeadline>

export const BrandWordmarkExample: Story = {
  name: 'BrandWordmark',
  render: () => <BrandWordmark>Land of Machala</BrandWordmark>,
}

export const PageHeadlineDesktop: Story = {
  name: 'PageHeadline / Desktop',
  render: () => <PageHeadline>Enter the Realm</PageHeadline>,
}

export const SectionHeadingFull: Story = {
  name: 'SectionHeading / Full',
  render: () => (
    <SectionHeading
      description="Choose your lineage and shaping your destiny before entering the realm."
      descriptionItalic
      overline="Step 1 of 3"
      showDivider
      title="Choose Your Origin"
    />
  ),
  parameters: { layout: 'padded' },
}

export const SectionHeadingMinimal: Story = {
  name: 'SectionHeading / Title only',
  render: () => <SectionHeading title="Character Setup" />,
}

export const SectionHeadingLeft: Story = {
  name: 'SectionHeading / Left aligned',
  render: () => (
    <SectionHeading
      align="left"
      description="Select from the options below to define your character."
      overline="Class"
      title="Warrior"
    />
  ),
  parameters: { layout: 'padded' },
}
