import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './stack'
import { Card } from './card'

const meta: Meta<typeof Stack> = {
  title: 'Core/Layout',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const StackPlayground: StoryObj<typeof Stack> = {
  render: (args) => (
    <Stack {...args} p="md">
      <div className="bg-red-500/50 p-4 rounded text-center">Item 1</div>
      <div className="bg-green-500/50 p-4 rounded text-center">Item 2</div>
      <div className="bg-blue-500/50 p-4 rounded text-center">Item 3</div>
    </Stack>
  ),
  args: {
    gap: 'md',
    direction: 'row',
  },
}

export const CardLayoutUnified: StoryObj = {
  render: () => (
    <div className="max-w-[400px]">
      <Card variant="secondary">
        <Card.Header align="center" justify="center">
          <Card.Title>Vše pod kontrolou</Card.Title>
        </Card.Header>
        
        <Card.Content align="center" gap="md">
          <div className="bg-white/10 p-4 rounded w-full text-center">Obsah zarovnaný na střed</div>
          <div className="bg-white/10 p-4 rounded w-full text-center">Pomocí Stack props</div>
        </Card.Content>
        
        <Card.Footer justify="between">
          <span>Verze 1.0</span>
          <span>Datum: 2026</span>
        </Card.Footer>
      </Card>
    </div>
  ),
}

export const GridStack: StoryObj<typeof Stack> = {
  render: () => (
    <div className="w-[600px]">
      <Stack display="grid" cols="3" gap="lg">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-amber-500/20 aspect-square flex items-center justify-center rounded border border-amber-500/30 font-bold">
            {i}
          </div>
        ))}
      </Stack>
    </div>
  ),
}
