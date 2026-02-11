import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './divider'
import { Footer } from './footer'
import { LoreQuote } from '../prefabs/lore-quote'

const meta: Meta<typeof Divider> = {
  title: 'Shared/Components',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const DividerBasic: StoryObj<typeof Divider> = {
  render: () => <Divider />,
}

export const DividerWithLabel: StoryObj<typeof Divider> = {
  render: () => <Divider label="Nebo" />,
}

export const FooterBasic: StoryObj<typeof Footer> = {
  render: () => (
    <div className="border border-white/10 p-4">
      <Footer />
    </div>
  ),
}

export const LoreQuoteBasic: StoryObj<typeof LoreQuote> = {
  render: () => <LoreQuote />,
}
