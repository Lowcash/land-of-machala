import type { Meta, StoryObj } from '@storybook/react'

import { Choice, ChoiceItem } from './choice'

const meta: Meta<typeof ChoiceItem> = {
  title: 'Shared/Choice',
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
      <ChoiceItem index={0} title="Postava v těžké zbroji" />
      <ChoiceItem index={1} title="Postava v kápi" />
      <ChoiceItem index={2} title="Postava ve stínech" />
    </Choice>
  ),
}
