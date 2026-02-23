import type { Meta, StoryObj } from '@storybook/react'

import { CurrencyIndicator, LocationIndicator } from './indicator'

const meta: Meta = {
  title: 'UI/Prefabs/Game/Indicator',
  tags: ['autodocs'],
}

export default meta

export const Location: StoryObj<typeof LocationIndicator> = {
  render: () => <LocationIndicator label="Iron Mountains" />,
}

export const Currency: StoryObj<typeof CurrencyIndicator> = {
  render: () => <CurrencyIndicator amount={1250} />,
}

export const SmallLocation: StoryObj<typeof LocationIndicator> = {
  render: () => <LocationIndicator label="Shadow Realm" size="xs" />,
}
