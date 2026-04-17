import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Stack, VStack } from '../../core/stack'
import { Description, Label, MutedText, NarrativeText, Value } from './shared'

const meta: Meta = {
  title: 'UI/Prefabs/Typography/Shared',
  tags: ['autodocs'],
}

export default meta

export const Collection: StoryObj = {
  render: () => (
    <Stack display="grid" cols="1" md={{ cols: '2' }} gap="xl" fullWidth>
      <VStack gap="xs" fullWidth>
        <Label align="left">Narrative Text (Lead)</Label>
        <NarrativeText align="left">
          This is a narrative lead text, used for storytelling and atmospheric descriptions.
        </NarrativeText>
      </VStack>

      <VStack gap="xs" fullWidth>
        <Label align="left">Value (Fantasy Nums)</Label>
        <VStack gap="sm">
          <Value>1250 GOLD</Value>
          <Value color="hp">120 HP</Value>
          <Value color="mana">80 MP</Value>
        </VStack>
      </VStack>

      <VStack gap="xs" fullWidth>
        <Label align="left">Label (Decoration)</Label>
        <Label align="left">STRENGTH +10</Label>
      </VStack>

      <VStack gap="xs" fullWidth>
        <Label align="left">Description (Detail/Bonus)</Label>
        <VStack gap="xs">
          <Description align="left">A rusted iron sword found in the ruins.</Description>
          <Description variant="bonus" color="success" align="left">
            +5 Attack Speed
          </Description>
        </VStack>
      </VStack>

      <VStack gap="xs" fullWidth>
        <Label align="left">Muted Text</Label>
        <MutedText align="left">Revision 1.2.4 - Kingdom Update</MutedText>
      </VStack>
    </Stack>
  ),
}
