import type { Meta, StoryObj } from '@storybook/react'
import { Choice } from './choice'
import * as React from 'react'

const meta: Meta<typeof Choice> = {
  title: 'Interactive/Choice',
  component: Choice,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Choice>

export const Default: Story = {
  args: {
    index: 0,
    title: 'Warrior',
    description: 'A master of combat and heavy armor.',
  },
}

export const MultipleChoices = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Choice
        index={0}
        title="Postava v těžké zbroji"
        description="Cítíš z ní sílu a odhodlání."
      />
      <Choice
        index={1}
        title="Postava v kápi"
        description="Kolem ní jiskří modravá magie."
      />
      <Choice
        index={2}
        title="Postava ve stínech"
        description="Sotva ji vidíš, ale cítíš chlad oceli."
      />
    </div>
  ),
}
