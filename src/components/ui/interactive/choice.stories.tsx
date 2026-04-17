import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Choice, ChoiceItem } from './choice'

const meta: Meta<typeof ChoiceItem> = {
  title: 'UI/Interactive/Choice',
  component: ChoiceItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChoiceItem>

export const Default: Story = {
  args: {
    index: 0,
    title: 'Warrior',
  },
}

export const MultipleChoices = {
  render: () => (
    <Choice>
      <ChoiceItem index={0} title="Heavy Armored Fighter" />
      <ChoiceItem index={1} title="Hooded Ranger" />
      <ChoiceItem index={2} title="Shadow Rogue" />
    </Choice>
  ),
}
