import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Text } from './typography'
import * as React from 'react'

const meta: Meta = {
  title: 'UI/Typography',
  tags: ['autodocs'],
}

export default meta

export const Headings = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Heading level="h1">The King's Decree (H1)</Heading>
      <Heading level="h2">The Lord's Manor (H2)</Heading>
      <Heading level="h3">The Knight's Shield (H3)</Heading>
      <Heading level="h4">The Guard's Post (H4)</Heading>
    </div>
  ),
}

export const Texts = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Text variant="lead">This is lead text, fit for the start of a legendary tale.</Text>
      <Text variant="default">This is default text. It is easy to read and follows the medieval theme with its slightly muted ivory tone.</Text>
      <Text variant="large">This is large text, emphasizing important information.</Text>
      <Text variant="small">This is small text, perfect for footnotes or minor details.</Text>
      <Text variant="muted">This is muted text, used for secondary info that shouldn't stand out too much.</Text>
    </div>
  ),
}
