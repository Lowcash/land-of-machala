import type { Meta, StoryObj } from '@storybook/react'
import { List, ListItem } from './list'
import { Badge } from './badge'
import { Heading, Text } from './typography'
import { Stack } from './stack'

const meta: Meta = {
  title: 'Core/List',
  component: List,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <div className="max-w-md">
      <List>
        <ListItem>První významná změna v království.</ListItem>
        <ListItem>Oprava chyby s mizejícími zlaťáky.</ListItem>
        <ListItem>Nová lokace: Temný les byla přidána na mapu.</ListItem>
      </List>
    </div>
  ),
}

export const Changelog: StoryObj = {
  render: () => (
    <Stack p="lg" border="game" bg="black-60" rounded="lg">
      <Heading level="h3" color="primary">Nejnovější změny</Heading>
      <List>
        <ListItem icon={<Badge variant="success">Novinka</Badge>}>
          <Text variant="default">Optimalizace zbrojíře pro rychlejší nákup.</Text>
        </ListItem>
        <ListItem icon={<Badge variant="magic">Update</Badge>}>
          <Text variant="muted" color="secondary">Vylepšená navigace v dungeonu.</Text>
        </ListItem>
        <ListItem icon={<Badge>Fix</Badge>}>
          <Text variant="default">Přidány nové úkoly pro začínající hrdiny.</Text>
        </ListItem>
      </List>
    </Stack>
  ),
}
