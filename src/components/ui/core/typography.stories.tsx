import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  BodyText,
  BrandWordmark,
  DisplayValue,
  HelperText,
  LabelText,
  MetaLabel,
  PageHeadline,
  SectionTitle,
} from '@/components/ui/core/typography'

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

function HelperStoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-outline-variant/60 w-72 border border-dashed">
      {children}
    </div>
  )
}

export const Default: BodyStory = {}

export const Muted: BodyStory = { args: { tone: 'muted' } }

export const Italic: BodyStory = { args: { italic: true, tone: 'muted' } }

export const Centered: BodyStory = { args: { align: 'center' } }

// ---------------------------------------------------------------------------
// MetaLabel
// ---------------------------------------------------------------------------

export const MetaLabelDefault: StoryObj = {
  name: 'MetaLabel / Default',
  render: () => <MetaLabel>Realm Status</MetaLabel>,
  parameters: { layout: 'centered' },
}

export const MetaLabelMuted: StoryObj = {
  name: 'MetaLabel / Muted',
  render: () => <MetaLabel tone="muted">2 hours ago</MetaLabel>,
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// LabelText
// ---------------------------------------------------------------------------

export const LabelPrimary: StoryObj = {
  name: 'LabelText / Primary',
  render: () => <LabelText>Hero Name</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelDefault: StoryObj = {
  name: 'LabelText / Default',
  render: () => <LabelText tone="default">System Notice</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelMuted: StoryObj = {
  name: 'LabelText / Muted',
  render: () => <LabelText tone="muted">Recent Chronicles</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelSoftMeta: StoryObj = {
  name: 'LabelText / Soft meta',
  render: () => <LabelText tone="soft">2 hours ago</LabelText>,
  parameters: { layout: 'centered' },
}

export const LabelError: StoryObj = {
  name: 'LabelText / Error',
  render: () => <LabelText tone="error">Invalid spell scroll</LabelText>,
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// HelperText
// ---------------------------------------------------------------------------

export const HelperDefault: StoryObj = {
  name: 'HelperText / Default',
  render: () => <HelperText>Must be at least 3 characters.</HelperText>,
  parameters: { layout: 'centered' },
}

export const HelperError: StoryObj = {
  name: 'HelperText / Error',
  render: () => <HelperText tone="error">Name already taken in this realm.</HelperText>,
  parameters: { layout: 'centered' },
}

export const HelperInvisible: StoryObj = {
  name: 'HelperText / Invisible (reserve space)',
  render: () => (
    <HelperStoryFrame>
      <LabelText tone="muted">Reserved helper slot</LabelText>
      <HelperText tone="invisible">Reserved helper slot</HelperText>
      <div className="text-on-surface-variant">
        Space stays reserved even when helper copy is hidden.
      </div>
    </HelperStoryFrame>
  ),
  parameters: { layout: 'centered' },
}

export const HelperNoReserve: StoryObj = {
  name: 'HelperText / No reserve space',
  render: () => (
    <HelperStoryFrame>
      <LabelText tone="muted">No reserved helper slot</LabelText>
      <HelperText reserveSpace={false} />
      <div className="text-on-surface-variant">
        No helper content means no vertical space is kept.
      </div>
    </HelperStoryFrame>
  ),
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

export const PageHeadlineMobile: StoryObj = {
  name: 'PageHeadline / Mobile',
  render: () => <PageHeadline>Enter the Realm</PageHeadline>,
  parameters: { layout: 'centered' },
}

export const SectionTitleFull: StoryObj = {
  name: 'SectionTitle / Full',
  render: () => (
    <SectionTitle
      description="Choose your lineage and shaping your destiny before entering the realm."
      descriptionItalic
      overline="Step 1 of 3"
      showDivider
      title="Choose Your Origin"
    />
  ),
  parameters: { layout: 'padded' },
}

export const SectionTitleMinimal: StoryObj = {
  name: 'SectionTitle / Title only',
  render: () => <SectionTitle title="Character Setup" />,
  parameters: { layout: 'centered' },
}

export const SectionTitleLeft: StoryObj = {
  name: 'SectionTitle / Left aligned',
  render: () => (
    <SectionTitle
      align="left"
      description="Select from the options below to define your character."
      overline="Class"
      title="Warrior"
    />
  ),
  parameters: { layout: 'padded' },
}
