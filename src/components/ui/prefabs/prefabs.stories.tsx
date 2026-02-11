import type { Meta, StoryObj } from '@storybook/react'
import { Changelog } from '@/components/features/auth/changelog'
import { Legend, Value, MutedText, Description, Decoration } from './typography/shared'
import { Stack } from '../core/stack'

const meta: Meta = {
  title: 'Prefabs/Components',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const TypographyPrefabs: StoryObj = {
  render: () => (
    <Stack gap="md" p="xl">
      <Stack gap="xs">
        <Decoration>Prefabs Showcase</Decoration>
        <Value>Fantasy Value Extraordinaire</Value>
      </Stack>
      
      <MutedText>
        This is a <Legend as="span" bold>Legend</Legend> inside a muted text block.
      </MutedText>
      
      <Description>
        A detailed description for lore or items.
      </Description>
      
      <Decoration>DECORATIVE TAGS</Decoration>
    </Stack>
  ),
}

export const ChangelogBasic: StoryObj<typeof Changelog> = {
  render: () => (
    <div className="w-[500px]">
      <Changelog 
        changes={[
          { category: 'Oprava', color: 'danger', description: 'Opraveno padání hry při startu.' },
          { category: 'Novinka', color: 'success', description: 'Přidán systém dynamického pozadí.' },
          { category: 'Vylepšení', color: 'gold', description: 'Optimalizace vykreslování UI.' },
        ]} 
      />
    </div>
  ),
}
