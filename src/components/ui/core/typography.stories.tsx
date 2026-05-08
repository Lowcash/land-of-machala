import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BodyText, BrandWordmark, DisplayValue, LabelText } from '@/components/ui/core/typography'
import { PageHeadline, SectionHeading } from '@/components/ui/prefabs/typography'

// ---------------------------------------------------------------------------
// BodyText
// ---------------------------------------------------------------------------

const bodyMeta: Meta<typeof BodyText> = {
  title: 'UI/Typography/BodyText',
  component: BodyText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'The realm stirs with ancient power, awaiting a worthy champion.' },
}

export default bodyMeta

type BodyStory = StoryObj<typeof BodyText>

export const Default: BodyStory = {}

export const Muted: BodyStory = { args: { tone: 'muted' } }

export const Italic: BodyStory = { args: { italic: true, tone: 'muted' } }

export const Centered: BodyStory = { args: { align: 'center' } }

// ---------------------------------------------------------------------------
// LabelText meta
// ---------------------------------------------------------------------------

export const LabelMetaDefault: StoryObj = {
  name: 'LabelText / Meta default',
  render: () => (
    <LabelText size="meta" tone="default" uppercase>
      Realm Status
    </LabelText>
  ),
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// LabelText
// ---------------------------------------------------------------------------

export const LabelPrimary: StoryObj = {
  name: 'LabelText / Primary',
  render: () => <LabelText>Hero name</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelDefault: StoryObj = {
  name: 'LabelText / Default',
  render: () => <LabelText tone="default">System notice</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelMuted: StoryObj = {
  name: 'LabelText / Muted',
  render: () => <LabelText tone="muted">Recent chronicles</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelSoftMeta: StoryObj = {
  name: 'LabelText / Soft meta',
  render: () => (
    <LabelText size="meta" tone="soft" uppercase>
      2 hours ago
    </LabelText>
  ),
  parameters: { layout: 'centered' },
}

export const LabelError: StoryObj = {
  name: 'LabelText / Error',
  render: () => <LabelText tone="error">Invalid spell scroll</LabelText>,
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// DisplayValue
// ---------------------------------------------------------------------------

export const DisplayLg: StoryObj = {
  name: 'DisplayValue / Large',
  render: () => <DisplayValue>1,248</DisplayValue>,
  parameters: { layout: 'centered' },
}

export const DisplayXl: StoryObj = {
  name: 'DisplayValue / XLarge primary',
  render: () => (
    <DisplayValue align="center" tone="primary">
      42
    </DisplayValue>
  ),
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// Prefabs
// ---------------------------------------------------------------------------

export const BrandWordmarkExample: StoryObj = {
  name: 'BrandWordmark',
  render: () => <BrandWordmark>Land of Machala</BrandWordmark>,
  parameters: { layout: 'centered' },
}

export const PageHeadlineDesktop: StoryObj = {
  name: 'PageHeadline / Desktop',
  render: () => <PageHeadline>Enter the Realm</PageHeadline>,
  parameters: { layout: 'centered' },
}

export const SectionHeadingFull: StoryObj = {
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

export const SectionHeadingMinimal: StoryObj = {
  name: 'SectionHeading / Title only',
  render: () => <SectionHeading title="Character Setup" />,
  parameters: { layout: 'centered' },
}

export const SectionHeadingLeft: StoryObj = {
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
